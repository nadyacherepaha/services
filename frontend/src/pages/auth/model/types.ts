import { forgotSchema, loginSchema, registerSchema, resetSchema } from '@pages/auth/model/schema';
import { InferType } from 'yup';

export type LoginParams = InferType<typeof loginSchema>;
export type RegisterParams = InferType<typeof registerSchema>;
export type ForgotParams = InferType<typeof forgotSchema>;
export type ResetParams = InferType<typeof resetSchema>;
