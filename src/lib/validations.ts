import * as z from 'zod';

export const PostSchema = z.object({
  content: z
    .string()
    .min(3, {
      message: 'Post must be at least 3 characters.',
    })
    .max(160, {
      message: 'Post must not be longer than 30 characters.',
    }),
});
