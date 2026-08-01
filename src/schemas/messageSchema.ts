import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "content must be of atleast 10 character")
    .max(500, "Content must be not longer than 500 characters"),
});
