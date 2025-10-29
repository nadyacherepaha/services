import { object, ref, string } from 'yup';

export const loginSchema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string().required('Password is required'),
});

export const registerSchema = object({
    name: string().required('Name is required'),
    email: string().email('Invalid email format').required('Email is required'),
    phone: string()
        .matches(/^\+?[0-9]{10,14}$/, 'Invalid phone number')
        .required('Phone is required'),
    socials: string()
        .trim()
        .matches(/^$|^https?:\/\/[^\s]+$/i, 'Invalid link format')
        .optional(),
    password: string().required('Password is required'),
});

export const forgotSchema = object({
    email: string().email('Enter a valid email').required('Email is required'),
});

export const resetSchema = object({
    password: string().min(6, 'Minimum 6 characters').required('Password is required'),
    confirm: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});
