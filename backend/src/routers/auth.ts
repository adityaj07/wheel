import {authController} from "@/controller";
import {validate} from "@/middleware/validate";
import {
  LoginSchema,
  LogoutSchema,
  RefreshSchema,
  SignUpSchema,
} from "@/schemas/auth";
import {Router} from "express";

const authRouter = Router({mergeParams: true});

authRouter.post(
  "/signup",
  validate({
    body: SignUpSchema,
  }),
  authController.signup,
);

authRouter.post(
  "/login",
  validate({
    body: LoginSchema,
  }),
  authController.login,
);

authRouter.post(
  "/refresh-token",
  validate({
    body: RefreshSchema,
  }),
  authController.refreshToken,
);

authRouter.post(
  "/logout",
  validate({
    body: LogoutSchema,
  }),
  authController.logout,
);

export default authRouter;
