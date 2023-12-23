import * as z from 'zod';

export const PostSchema = z.object({
  content: z
    .string()
    .min(3, {
      message: 'Post must be at least 3 characters.',
    })
    .max(160, {
      message: 'Post must not be longer than 160 characters.',
    }),
});

export const ProfileSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username must contains at least 1 character.' })
    .max(20),
  name: z
    .string()
    .min(1, { message: 'Display Name must contains at least 1 character.' })
    .max(20),
  bio: z
    .string()
    .max(160, { message: 'Bio must cointains max 160 characters.' }),
  avatar_url: z.string(),
  url: z.string(),
  company: z.string().max(20),
  hireEmail: z.string(),
  link1: z.string(),
  link2: z.string(),
  link3: z.string(),
});
