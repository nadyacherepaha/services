import type { SafeT } from '@shared/i18n/hooks/useSafeT';
import type { ObjectSchema } from 'yup';
import { object, ref, string } from 'yup';
import { ForgotParams, LoginParams, RegisterParams, ResetParams } from './types';

export const createLoginSchema = (t: SafeT): ObjectSchema<LoginParams> =>
    object({
        email: string().email(t('errors.email')).required(t('errors.required')),
        password: string().required(t('errors.password')),
    });

export const createRegisterSchema = (t: SafeT): ObjectSchema<RegisterParams> =>
    object({
        name: string().required(t('errors.name')),
        email: string().email(t('errors.email')).required(t('errors.required')),
        phone: string().matches(/^\+?[0-9]{10,14}$/, t('errors.phone')).required(t('errors.required')),
        socials: string().trim().matches(/^$|^https?:\/\/[^\s]+$/i, t('errors.socials')).optional(),
        password: string().required(t('errors.password')),
    });

export const createForgotSchema = (t: SafeT): ObjectSchema<ForgotParams> =>
    object({
        email: string().email(t('errors.email')).required(t('errors.required')),
    });

export const createResetSchema = (t: SafeT): ObjectSchema<ResetParams> =>
    object({
        password: string().min(6, t('errors.min', { count: 6 })).required(t('errors.password')),
        confirm: string().oneOf([ref('password')], t('errors.password_match')).required(t('errors.required')),
    });
