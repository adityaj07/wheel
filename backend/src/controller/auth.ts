import { db } from "@/lib/db";
import { StatusCodes } from "@/lib/statusCodes";
import type { NoParams } from "@/types";
import type { LoginBody, SignupBody } from "@/types/auth";
import { AppError } from "@/utils/AppError";
import { asyncHandler } from "@/utils/asyncHandler";
import { addDays } from "@/utils/date";
import { signAccessToken } from "@/utils/jwt";
import { createRefreshToken, generateRefreshTokenString } from "@/utils/tokens";
import bcrypt from "bcryptjs";

const REFRESH_TOKEN_EXPIRY_DAYS = Number(
  process.env.REFRESH_TOKEN_EXPIRY_DAYS || 30
);

export const signup = asyncHandler<NoParams, NoParams, SignupBody>(
  async (req, res) => {
    const { email, name, password } = req.body;

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new AppError("User already exists", StatusCodes.BAD_REQUEST.code);
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
  }
);

export const login = asyncHandler<NoParams, NoParams, LoginBody>(
  async (req, res) => {
    const { email, password } = req.body;

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
      userExists.passwordHash
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
  }
);
