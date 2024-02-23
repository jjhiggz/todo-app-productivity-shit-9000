import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
});

export const createUser = userSchema.omit({
  id: true,
});

export type User = z.infer<typeof userSchema>;
