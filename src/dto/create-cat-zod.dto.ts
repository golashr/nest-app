import { z } from 'zod';

export const createCatZodSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDtoZod = z.infer<typeof createCatZodSchema>;
