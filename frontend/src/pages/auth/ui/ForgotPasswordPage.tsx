import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotParams, forgotSchema } from '@pages/auth/model';
import { forgotPassword } from '@shared/api';
import { routes } from '@shared/lib';
import { FormField, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import { Logo } from '@shared/ui/svg';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
    const [msg, setMsg] = useState<string>('');

    const methods = useForm({
        resolver: yupResolver(forgotSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { email: '' },
    });

    const onSubmit = async ({ email }: ForgotParams) => {
        setStatus('idle');
        setMsg('');

        try {
            await forgotPassword(email);
            setStatus('sent');
            setMsg('We’ve sent a reset link to your email.');
        } catch (e: any) {
            setStatus('error');
            setMsg(e?.error || 'Failed to send reset email');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center w-100 mt-6">
                    <ThemedIcon size="custom" className="h-24 w-24">
                        <Logo filled/>
                    </ThemedIcon>
                </div>
                <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-zinc-700 dark:text-white">
                    Forgot Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <FormProvider {...methods}>
                        <FormField name="email" label="Email address" type="email" autoComplete="email"/>
                    </FormProvider>

                    {status !== 'idle' && (
                        <div
                            className={
                                status === 'sent'
                                    ? 'rounded bg-green-50 p-2 text-sm text-green-700 text-center dark:bg-green-500/10 dark:text-green-400'
                                    : 'rounded bg-red-50 p-2 text-sm text-red-600 text-center dark:bg-red-500/10 dark:text-red-400'
                            }
                        >
                            {msg}
                        </div>
                    )}

                    <ThemedButton
                        type="submit"
                        loading={methods.formState.isSubmitting}
                        disabled={methods.formState.isSubmitting}
                        className="w-full text-sm/6 font-semibold"
                    >
                        Send reset link
                    </ThemedButton>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Remembered your password?{' '}
                    <ThemedText as={Link} to={routes.signIn} className="font-semibold hover:underline">
                        Sign In
                    </ThemedText>
                </p>
            </div>
        </div>
    );
};
