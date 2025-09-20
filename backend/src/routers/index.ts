import {Router} from "express";
import authRouter from "./auth";
import healthRouter from "./health";
import {authRateLimiter} from "@/middleware/rateLimiter";

const indexRouter = Router({mergeParams: true});

indexRouter.use("/health", healthRouter);
indexRouter.use("/auth", authRateLimiter, authRouter);

export default indexRouter;
