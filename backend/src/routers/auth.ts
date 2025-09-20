import { authController } from "@/controller";
import { validate } from "@/middleware/validate";
import { LoginSchema, SignUpSchema } from "@/schemas/auth";
import { Router } from "express";

const authRouter = Router({ mergeParams: true });

authRouter.post(
  "/sign-up",
  validate({
    body: SignUpSchema,
  }),
  authController.signup
);

authRouter.post(
  "/log-in",
  validate({
    body: LoginSchema,
  }),
  authController.login
);

export default authRouter;
