import { env } from "@/config/env";
import type { AccessTokenPayload } from "@/types/auth";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = env.JWT_ACCESS_TOKEN_SECRET || "dev-secret";
const ACCESS_EXP = 15 * 60;

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    // reject string payloads
    if (typeof decoded === "string") return null;
    return decoded as AccessTokenPayload;
  } catch (error) {
    return null;
  }
}
