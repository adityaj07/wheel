import {bookingController, vehicleController} from "@/controller";
import {validate} from "@/middleware/validate";
import {CreateBookingBodySchema} from "@/schemas/bookings";
import {
  SearchVehicleBodySchema,
  SearchVehicleQuerySchema,
} from "@/schemas/vehicles";

import {Router} from "express";

const bookingRouter = Router({mergeParams: true});

bookingRouter.use(
  "/create",
  validate({
    body: CreateBookingBodySchema,
  }),
  bookingController.create,
);

export default bookingRouter;
