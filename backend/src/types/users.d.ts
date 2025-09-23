import type {GetUserBookingsQuerySchemaType} from "@/schemas/users";
import type {ReqQueryPagination} from "./common";

export type GetUserBookingsQuery = GetUserBookingsQuerySchemaType &
  ReqQueryPagination;
