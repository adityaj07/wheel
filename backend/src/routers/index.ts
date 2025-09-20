import {requireAuth} from "@/middleware/auth";
import {authRateLimiter} from "@/middleware/rateLimiter";
import {Router} from "express";
import authRouter from "./auth";
import healthRouter from "./health";
import userRouter from "./users";

const indexRouter = Router({mergeParams: true});

indexRouter.use("/health", healthRouter);
indexRouter.use("/auth", authRateLimiter, authRouter);
indexRouter.use("/users", requireAuth, userRouter);

export default indexRouter;
