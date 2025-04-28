import { loginSchema, registerSchema } from '@pages/auth/model/schema';
import { InferType } from 'yup';

export type LoginParams = InferType<typeof loginSchema>;
export type RegisterParams = InferType<typeof registerSchema>;
