import { StatusCodes } from "@/lib/statusCodes";
import { AppError } from "@/utils/AppError";
import { verifyAccessToken } from "@/utils/jwt";
import type { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED.code);
  }

  const token = auth.split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED.code);
  }
  const payload = verifyAccessToken(token);
  if (!payload) {
    throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED.code);
  }

  req.user = payload;
  next();
}
