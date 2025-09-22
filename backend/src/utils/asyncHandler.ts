import type {NextFunction, Request, RequestHandler, Response} from "express";

export const asyncHandler =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction,
    ) => Promise<any>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
