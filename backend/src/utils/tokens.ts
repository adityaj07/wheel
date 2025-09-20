import { db } from "@/lib/db";
import type { CreateRefreshTokenParams } from "@/types/auth";
import bcrypt from "bcryptjs";
import { uuid } from "uuidv4";

const SALT_ROUNDS = 12;

export function generateRefreshTokenString() {
  return uuid() + "." + uuid();
}

export async function hashToken(token: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  return bcrypt.hash(token, salt);
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
  const tokenHash = await hashToken(token);
  const refreshToken = await db.refreshToken.create({
    data: {
      tokenHash,
      expiresAt,
      createdByIp,
      userId,
      userAgent,
      isActive: true,
    },
  });

  return refreshToken;
}
