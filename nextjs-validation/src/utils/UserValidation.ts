import { z } from "zod";

const userValidation = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20).optional(),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z
    .string()
    .min(10)
    .max(150)
    .refine((value) => /^[a-z]^[A-Z]^[0-9]/.test(value), {
      message: "Address should not contain special characters", // custom Validation and error message
    })
    .optional(),
});
