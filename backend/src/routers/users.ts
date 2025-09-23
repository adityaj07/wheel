import {userController} from "@/controller";
import {requireAuth} from "@/middleware/auth";
import {Router} from "express";

const userRouter = Router({mergeParams: true});

userRouter.get("/me", requireAuth, userController.me);
userRouter.get("/bookings", userController.getUserBookings);

export default userRouter;
