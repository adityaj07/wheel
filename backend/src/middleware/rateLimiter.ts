import { env } from "@/config/env";
import rateLimit from "express-rate-limit";

const ENV = env.NODE_ENV;

export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: ENV === "development" ? 100 : 10,
  message: {
    message: "Too many requests, please try again later.",
  },
});
