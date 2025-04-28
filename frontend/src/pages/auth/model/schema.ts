import { object, string } from 'yup';

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
    password: string().required('Password is required'),
});
