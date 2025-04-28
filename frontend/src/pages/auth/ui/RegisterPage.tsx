import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterParams, registerSchema } from '@pages/auth/model';
import { useAuth } from '@shared/lib';
import React from 'react';
import { useForm } from 'react-hook-form';

export const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterParams) => {
        try {
            const { email, name, phone, password } = data;
            await registerUser({ email, name, phone, password });
        } catch (e) {
            console.error('Something went wrong...');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email', { required: true })} />
            {errors.email && <span>{errors.email.message}</span>}

            <input {...register('password', { required: true })} />
            {errors.password && <span>{errors.password.message}</span>}

            <input {...register('name', { required: true })} />
            {errors.name && <span>{errors.name.message}</span>}

            <input {...register('phone', { required: true })} />
            {errors.phone && <span>{errors.phone.message}</span>}

            <input type="submit"/>
        </form>
    );
};
