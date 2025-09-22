import {vehicleController} from "@/controller";
import {validate} from "@/middleware/validate";
import {
  SearchVehicleBodySchema,
  SearchVehicleQuerySchema,
} from "@/schemas/vehicles";

import {Router} from "express";

const vehicleRouter = Router({mergeParams: true});

vehicleRouter.use(
  "/search",
  validate({
    body: SearchVehicleBodySchema,
    query: SearchVehicleQuerySchema,
  }),
  vehicleController.searchVehicle,
);

export default vehicleRouter;
