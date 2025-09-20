import { StatusCodes } from "@/lib/statusCodes";
import { AppError } from "@/utils/AppError";
import { type NextFunction, type Request, type Response } from "express";
import { ZodError } from "zod";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(StatusCodes.NOT_FOUND.code)
    .json({ message: StatusCodes.NOT_FOUND.label });
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR.code;
  let message: string = StatusCodes.INTERNAL_SERVER_ERROR.label;
  let details = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST.code;
    message = "Validation failed";
    details = err.issues;
  } else if (err instanceof Error) {
    message = err.message;
  }

  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(details ? { details } : {}),
  });
}
