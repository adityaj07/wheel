import type {
  SearchVehicleBodySchemaType,
  SearchVehicleQuerySchemaType,
} from "@/schemas/vehicles";
import type {Vehicle, VehicleLocation, VehicleType} from "generated/prisma";

export type PaginationMeta = {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

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
export type SearchVehicleQuery = SearchVehicleQuerySchemaType;

export type VehicleResponseItem = VehicleBase & VehicleDerived;

export type SearchVehicleResponse = {
  data: VehicleResponseItem[];
} & PaginationMeta;
