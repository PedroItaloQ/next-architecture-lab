import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
});
