import { yupResolver } from '@hookform/resolvers/yup';
import { LoginParams, loginSchema } from '@pages/auth/model';
import { routes, useAuth } from '@shared/lib';
import { FormField, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import { Logo } from '@shared/ui/svg';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const { login, error } = useAuth();
    const methods = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginParams) => {
        const { email, password } = data;
        await login({ email, password });
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center w-100 mt-6">
                        <ThemedIcon size="custom" className="h-24 w-24">
                            <Logo filled/>
                        </ThemedIcon>
                    </div>

                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-zinc-700 dark:text-white">
                        Sign In
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-6">
                        <FormProvider {...methods}>
                            <FormField name="email" label="Email address" type="email" autoComplete="email"/>
                            <FormField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="password"
                                labelRight={
                                    <ThemedText
                                        as={Link}
                                        to={routes.forgotPassword}
                                        className="text-sm font-semibold hover:underline"
                                    >
                                        Forgot password?
                                    </ThemedText>
                                }
                            />
                        </FormProvider>

                        {error && (
                            <div
                                className="rounded bg-red-50 p-2 text-sm text-red-600 text-center dark:bg-red-500/10 dark:text-red-400"
                            >
                                {error}
                            </div>
                        )}

                        <ThemedButton
                            type="submit"
                            loading={methods.formState.isSubmitting}
                            disabled={methods.formState.isSubmitting}
                            className="w-full text-sm/6 font-semibold"
                        >
                            Sign In
                        </ThemedButton>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Don’t have an account?{' '}
                        <ThemedText as={Link} to={routes.signUp} className="font-semibold hover:underline">
                            Sign Up
                        </ThemedText>
                    </p>
                </div>
            </div>
        </div>
    );
};
