import * as z from 'zod';

export const PaginationSchema = z.object({
  limit: z.number().positive(),
  offset: z.number().nonnegative().optional(),
});
