import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more then 20 character.' })
    .optional(),
});

const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

const createUserValidationSchema = z.object({
  body: z.object({
    data: z.object({
      name: z.string().max(30),
      email: z.string().email(),
      needsPasswordChange: z.boolean().default(true),
      passwordChangedAt: z.date().optional(),
      password: z.string().max(20),
      status: z
        .enum(['active', 'inactive', 'in-progress'])
        .default('in-progress'),
      role: z.enum(['user', 'admin', 'superuser']).default('user'),
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidation,
  createUserValidationSchema,
};
