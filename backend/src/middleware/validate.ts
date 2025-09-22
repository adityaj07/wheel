import {StatusCodes} from "@/lib/statusCodes";
import {AppError} from "@/utils/AppError";
import type {NextFunction, RequestHandler} from "express";
import {ZodError, type z, type ZodObject, type ZodRawShape} from "zod";

type Schema = {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
};

export const validate =
  <T extends Schema>(
    schema: T,
  ): RequestHandler<
    T["params"] extends ZodObject<ZodRawShape> ? z.infer<T["params"]> : any,
    any,
    T["body"] extends ZodObject<ZodRawShape> ? z.infer<T["body"]> : any,
    T["query"] extends ZodObject<ZodRawShape> ? z.infer<T["query"]> : any
  > =>
  (req, _res, next: NextFunction) => {
    try {
      if (schema.body)
        req.body = schema.body.parse(req.body) as typeof req.body;
      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);
        Object.assign(req.query, parsedQuery);
      }
      if (schema.params) {
        const parsedParams = schema.params.parse(req.params);
        Object.assign(req.params, parsedParams);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError(
            "Validation failed",
            StatusCodes.BAD_REQUEST.code,
            error.issues,
          ),
        );
      }

      next(error);
    }
  };
