import * as z from 'zod';

// auth schema

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name must contain at least 1 character' })
      .max(20),
    username: z
      .string()
      .min(3, { message: 'Username must cointain at least 3 characters' })
      .max(20)
      .toLowerCase(),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password must cointain at least 6 characters' })
      .max(100),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password do not match' })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password did not match',
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must cointain at least 6 character(s)' })
    .max(100),
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

export const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Password must cointain at least 6 character(s)' })
      .max(100),
    newPassword: z
      .string()
      .min(6, { message: 'Password must cointain at least 6 character(s)' })
      .max(100),
    confirmNewPassword: z
      .string()
      .min(6, { message: 'Password did not match' })
      .max(100),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Password did not match',
    path: ['confirmNewPassword'],
  });

// post schema

export const PostSchema = z.object({
  content: z
    .string()
    .min(3, {
      message: 'Post must be at least 3 characters.',
    })
    .max(160, {
      message: 'Post must not be longer than 160 characters.',
    }),
  draft: z.boolean(),
});

export const CommentSchema = z.object({
  content: z
    .string()
    .min(3, {
      message: 'Post must be at least 3 characters.',
    })
    .max(160, {
      message: 'Post must not be longer than 160 characters.',
    }),
});
