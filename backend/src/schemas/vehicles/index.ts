import z from "zod";

export const SearchVehicleBodySchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid startDate format (YYYY-MM-DD)"),
  startTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Invalid startTime format (HH:mm, 24hr)",
    ),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid endDate format (YYYY-MM-DD)"),
  endTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Invalid endTime format (HH:mm, 24hr)",
    ),
});

export const SearchVehicleQuerySchema = z.object({
  location: z.string().optional(),
});

export type SearchVehicleBodySchemaType = z.infer<
  typeof SearchVehicleBodySchema
>;
export type SearchVehicleQuerySchemaType = z.infer<
  typeof SearchVehicleQuerySchema
>;
