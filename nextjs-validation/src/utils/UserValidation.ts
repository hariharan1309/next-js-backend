import { z } from "zod";

export const userValidation = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().max(20).optional(),
  email: z
    .string()
    .email()
    .max(50, { message: "Email should not exceed 50 characters" }), // custom error message
  phone: z.string().min(10).max(15),
  address: z
    .string()
    .max(150)
    .refine((value) => !/[^a-zA-Z0-9]/.test(value), {
      message: "Address should not contain special characters", // custom Validation and error message
    })
    .optional(),
});
