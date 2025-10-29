import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterParams, registerSchema } from '@pages/auth/model';
import { routes, useAuth } from '@shared/lib';
import { FormField, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import { Logo } from '@shared/ui/svg';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const { register: registerUser, error } = useAuth();
    const methods = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            socials: '',
            password: '',
        },
    });

    const onSubmit = async (data: RegisterParams) => {
        const { email, name, phone, password, socials } = data;
        await registerUser({ email, name, phone, password, socials });
    };

    useEffect(() => {
        if (error) methods.reset();
    }, [methods.reset, error]);


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
                        Sign up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-6">
                        <FormProvider {...methods}>
                            <FormField name="name" label="Name" autoComplete="name"/>
                            <FormField name="email" label="Email address" type="email" autoComplete="email"/>
                            <FormField name="phone" label="Phone" type="tel" autoComplete="tel"/>
                            <FormField name="socials" label="Socials (Link)" optional/>

                            <FormField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
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
                            Sign Up
                        </ThemedButton>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Already have an account?{' '}
                        <ThemedText as={Link} to={routes.signIn} className="font-semibold hover:underline">
                            Sign In
                        </ThemedText>
                    </p>
                </div>
            </div>
        </div>
    );
};
