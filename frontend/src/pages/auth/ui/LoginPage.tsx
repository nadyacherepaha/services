import { yupResolver } from '@hookform/resolvers/yup';
import { LoginParams, loginSchema } from '@pages/auth/model';
import { useAuth } from '@shared/lib';
import React from 'react';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginParams) => {
        try {
            const { email, password } = data;
            await login({ email, password });
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

            <input type="submit"/>
        </form>
    );
};
