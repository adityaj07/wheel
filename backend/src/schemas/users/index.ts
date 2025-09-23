import {BookingStatus} from "generated/prisma";
import z from "zod";

export const GetUserBookingsQuerySchema = z.object({
  status: z.enum(BookingStatus).optional(),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid startDate format (YYYY-MM-DD)")
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid endDate format (YYYY-MM-DD)")
    .optional(),
});

export type GetUserBookingsQuerySchemaType = z.infer<
  typeof GetUserBookingsQuerySchema
>;
