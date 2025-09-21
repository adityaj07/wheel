import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {LogoutSchemaType, RefreshSchemaType} from "@/schemas/auth";
import type {NoParams} from "@/types";
import type {LoginBody, SignupBody} from "@/types/auth";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";
import {addDays} from "@/utils/date";
import {signAccessToken} from "@/utils/jwt";
import {
  createRefreshToken,
  generateRefreshTokenString,
  getFingerprint,
  verifyRefreshToken,
} from "@/utils/tokens";
import bcrypt from "bcryptjs";

const REFRESH_TOKEN_EXPIRY_DAYS = Number(
  process.env.REFRESH_TOKEN_EXPIRY_DAYS || 30,
);

export const signup = asyncHandler<NoParams, NoParams, SignupBody>(
  async (req, res) => {
    const {email, name, password} = req.body;

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new AppError(
        "Account already exists. Please Login",
        StatusCodes.BAD_REQUEST.code,
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return res.status(StatusCodes.CREATED.code).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  },
);

export const login = asyncHandler<NoParams, NoParams, LoginBody>(
  async (req, res) => {
    const {email, password} = req.body;

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!userExists) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED.code);
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userExists.passwordHash,
    );
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED.code);
    }

    // create access token
    const accessToken = signAccessToken({
      sub: userExists.id,
      email: userExists.email,
    });

    // create refresh token
    const refreshToken = generateRefreshTokenString();
    const expiresAt = addDays(new Date(), REFRESH_TOKEN_EXPIRY_DAYS);

    await createRefreshToken({
      userId: userExists.id,
      token: refreshToken,
      expiresAt,
      createdByIp: req.ip,
      userAgent: req.get("user-agent") || undefined,
    });

    return res.status(StatusCodes.OK.code).json({
      accessToken,
      refreshToken,
      expiresAt: expiresAt.toISOString(),
    });
  },
);

export const refreshToken = asyncHandler<NoParams, NoParams, RefreshSchemaType>(
  async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken)
      throw new AppError("No token", StatusCodes.BAD_REQUEST.code);

    // 1. Lookup by fingerprint
    const fingerprint = getFingerprint(refreshToken);
    const tokenRow = await db.refreshToken.findFirst({
      where: {
        tokenFingerprint: fingerprint,
        isActive: true,
      },
      include: {
        user: true,
      },
    });

    if (!tokenRow) {
      throw new AppError(
        "Invalid refresh token",
        StatusCodes.UNAUTHORIZED.code,
      );
    }

    // 2. Verify token against hash
    const valid = await verifyRefreshToken(refreshToken, tokenRow?.tokenHash);
    if (!valid) {
      // potential resue => we revoke all user tokens
      await db.refreshToken.updateMany({
        where: {
          userId: tokenRow.userId,
        },
        data: {
          isActive: false,
          revokedAt: new Date(),
          revokedReason: "reuse_detected",
        },
      });
      throw new AppError(
        "Refresh token reuse detected",
        StatusCodes.FORBIDDEN.code,
      );
    }

    // 3. Check expiry
    if (tokenRow.expiresAt < new Date()) {
      await db.refreshToken.update({
        where: {
          id: tokenRow.id,
        },
        data: {
          isActive: false,
          revokedAt: new Date(),
          revokedReason: "expired",
        },
      });
      throw new AppError(
        "Refresh token expired",
        StatusCodes.UNAUTHORIZED.code,
      );
    }

    // 4. Rotate token
    const newRefreshToken = generateRefreshTokenString();
    const newExpiresAt = addDays(new Date(), REFRESH_TOKEN_EXPIRY_DAYS);

    const newTokenRow = await createRefreshToken({
      userId: tokenRow.userId,
      token: newRefreshToken,
      expiresAt: newExpiresAt,
      createdByIp: req.ip,
      userAgent: req.get("user-agent") || undefined,
    });

    // revoke old token
    await db.refreshToken.update({
      where: {
        id: tokenRow.id,
      },
      data: {
        isActive: false,
        revokedAt: new Date(),
        replacedByToken: newTokenRow.id,
      },
    });

    // 5. Issue new access token
    const accessToken = signAccessToken({
      sub: tokenRow.userId,
      email: tokenRow.user.email,
    });

    return res.status(StatusCodes.OK.code).json({
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt: newExpiresAt.toISOString(),
    });
  },
);

export const logout = asyncHandler<NoParams, NoParams, LogoutSchemaType>(
  async (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) {
      throw new AppError("No token provided", StatusCodes.BAD_REQUEST.code);
    }

    const fingerprint = getFingerprint(refreshToken);

    const tokenRow = await db.refreshToken.findFirst({
      where: {
        tokenFingerprint: fingerprint,
        isActive: true,
      },
    });
    if (!tokenRow) {
      // Already revoked or invalid → return success anyway (idempotent logout)
      return res.status(StatusCodes.OK.code).json({message: "Logged out"});
    }

    const valid = await verifyRefreshToken(refreshToken, tokenRow.tokenHash);
    if (!valid) {
      // sus here: fingerprint match but hash mismatch
      await db.refreshToken.update({
        where: {
          id: tokenRow.id,
        },
        data: {
          isActive: false,
          revokedAt: new Date(),
          revokedByIp: req.ip,
          revokedReason: "mismatch_on_logout",
        },
      });
      return res.status(StatusCodes.OK.code).json({message: "Logged out"});
    }

    // Normal revoke
    await db.refreshToken.update({
      where: {id: tokenRow.id},
      data: {
        isActive: false,
        revokedAt: new Date(),
        revokedByIp: req.ip,
        revokedReason: "logout",
      },
    });

    return res.status(StatusCodes.OK.code).json({message: "Logged out"});
  },
);
