import z from "zod";

const todoBase = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title is required")
    .max(200, "maximum 200 characters allowed"),
  description: z
    .string()
    .trim()
    .max(200, "maximum 200 characters allowed")
    .optional(),
  completed: z.boolean(),
});

export const todoValidation = todoBase.extend({
  completed: z.boolean().default(false),
});

export const todoUpdateValidation = todoBase.partial();
