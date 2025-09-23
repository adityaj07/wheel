import type {NextFunction, Request, RequestHandler, Response} from "express";
import type {ParsedQs} from "qs";

export const asyncHandler =
  <P = any, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction,
    ) => Promise<ResBody | void>,
  ): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error("AsyncHandler caught error:", err);
      next(err);
    }
  };
