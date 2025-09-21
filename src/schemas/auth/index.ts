import z from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string("Name is required.")
      .min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid Email"),
    password: z
      .string("Password is required.")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string("Confirm password is required."),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z
    .string("Password is required.")
    .min(6, "Password must be at least 6 characters"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
