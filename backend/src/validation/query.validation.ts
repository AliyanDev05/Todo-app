import z from "zod";

const queryValidation = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  completed: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  search: z.string().trim().optional(),
  sort: z
    .enum([
      "createdAt",
      "-createdAt",
      "title",
      "-title",
      "completed",
      "-completed",
    ])
    .optional(),
});

export default queryValidation;
