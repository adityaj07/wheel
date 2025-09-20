import {userController} from "@/controller";
import {requireAuth} from "@/middleware/auth";
import {Router} from "express";

const userRouter = Router({mergeParams: true});

userRouter.get("/me", userController.me);

export default userRouter;
