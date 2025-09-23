import z from "zod";

export const PaginationQueryParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : 1))
    .refine(val => val >= 1 && val <= 1000, {
      message: "Page must be between 1 and 1000",
    }),
  limit: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : 10))
    .refine(val => val >= 1 && val <= 1000, {
      message: "Limit must be between 1 and 1000",
    }),
});

export type PaginationQueryParamsSchemaType = z.infer<
  typeof PaginationQueryParamsSchema
>;
