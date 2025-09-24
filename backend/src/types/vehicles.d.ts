import type {
  SearchVehicleBodySchemaType,
  SearchVehicleQuerySchemaType,
} from "@/schemas/vehicles";
import type {
  Vehicle,
  VehicleLocation,
  VehicleType,
} from "generated/prisma/index.js";
import {PaginationMeta} from "./index";
import type {ReqQueryPagination} from "./common";

type VehicleBase = Pick<
  Vehicle,
  "id" | "name" | "number" | "imageUrl" | "pricePerDay" | "includedKmPerDay"
> & {
  vehicleType: Pick<VehicleType, "name">;
  locations: Pick<VehicleLocation, "location">[];
};

type VehicleDerived = {
  calculatedPrice: number;
  calculatedIncludedKm: number;
  duration: string;
  availability: Record<string, boolean>;
};

export type SearchVehicleBody = SearchVehicleBodySchemaType;
export type SearchVehicleQuery = SearchVehicleQuerySchemaType &
  ReqQueryPagination;

export type VehicleResponseItem = VehicleBase & VehicleDerived;

export type SearchVehicleResponse = {
  data: VehicleResponseItem[];
} & PaginationMeta;
