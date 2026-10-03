import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title is too long"),

  description: z
    .string()
    .trim()
    .max(1000, "Description is too long")
    .optional(),

  assignedToId: z
    .coerce
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title cannot be empty")
    .max(200, "Task title is too long")
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description is too long")
    .nullable()
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"])
    .optional(),

  assignedToId: z
    .coerce
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),
});