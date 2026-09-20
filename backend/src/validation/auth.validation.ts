import z from "zod";

export const registerValidation = z.object({
  username: z
    .string()
    .trim()
    .min(1, "username is Required")
    .max(100, "100 characters allowed"),
  email: z.string().trim().lowercase().email("Email must be valid"),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long")
    .max(20, "maximum 20 char allowed"),
});

export const loginValidation = z.object({
  email: z.string().trim().lowercase().email("Email must be valid"),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long")
    .max(20, "maximum 20 char allowed"),
});
