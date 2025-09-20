import type { LoginSchemaType, SignUpSchemaType } from "@/schemas/auth";
import type { User } from "generated/prisma";

export type AccessTokenPayload = {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
};

export type SignupBody = Pick<SignUpSchemaType, "name" | "email" | "password">;
export type SignupRes = Pick<User, "id" | "email">;

export type LoginBody = Pick<LoginSchemaType, "email" | "password">;
export type LoginRes = Pick<User, "id" | "email">;

export type CreateRefreshTokenParams = {
  userId: string;
  token: string;
  expiresAt: Date;
  createdByIp?: string;
  userAgent?: string;
};
