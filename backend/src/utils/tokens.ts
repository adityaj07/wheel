import {db} from "@/lib/db";
import type {CreateRefreshTokenParams} from "@/types/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SALT_ROUNDS = 12;

export function generateRefreshTokenString() {
  return crypto.randomBytes(64).toString("hex");
}

export function getFingerprint(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function hashRefreshToken(token: string): Promise<string> {
  return bcrypt.hash(token, SALT_ROUNDS);
}

export async function verifyTokenHash(token: string, hash: string) {
  return bcrypt.compare(token, hash);
}

// Creates and stores a refresh token record for a user
export async function createRefreshToken({
  userId,
  token,
  expiresAt,
  createdByIp,
  userAgent,
}: CreateRefreshTokenParams) {
  const tokenHash = await hashRefreshToken(token);
  const tokenFingerprint = getFingerprint(token);

  const refreshToken = await db.refreshToken.create({
    data: {
      tokenHash,
      tokenFingerprint,
      expiresAt,
      createdByIp,
      userId,
      userAgent,
      isActive: true,
    },
  });

  return refreshToken;
}

export async function verifyRefreshToken(
  token: string,
  tokenHash: string,
): Promise<Boolean> {
  return bcrypt.compare(token, tokenHash);
}
