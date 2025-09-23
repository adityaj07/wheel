import {requireAuth} from "@/middleware/auth";
import {authRateLimiter} from "@/middleware/rateLimiter";
import {Router} from "express";
import authRouter from "./auth";
import healthRouter from "./health";
import userRouter from "./users";
import vehicleRouter from "./vehicles";
import bookingRouter from "./bookings";

const indexRouter = Router({mergeParams: true});

indexRouter.use("/health", healthRouter);
indexRouter.use("/auth", authRateLimiter, authRouter);
indexRouter.use("/users", requireAuth, userRouter);
indexRouter.use("/vehicles", requireAuth, vehicleRouter);
indexRouter.use("/bookings", requireAuth, bookingRouter);

export default indexRouter;
