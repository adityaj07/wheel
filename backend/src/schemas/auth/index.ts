import z from "zod";

export const SignUpSchema = z.object({
  name: z
    .string("Name is required.")
    .min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid Email"),
  password: z
    .string("Password is required.")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string("Password is required.")
    .min(6, "Password must be at least 6 characters"),
});

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export const LogoutSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RefreshSchemaType = z.infer<typeof RefreshSchema>;
export type LogoutSchemaType = z.infer<typeof LogoutSchema>;
