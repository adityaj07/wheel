import type { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncHandler =
  <ReqParam = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<ReqParam, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ): RequestHandler<ReqParam, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
