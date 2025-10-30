import { yupResolver } from '@hookform/resolvers/yup';
import { createResetSchema, type ResetParams } from '@pages/auth/model';
import { resetPassword } from '@shared/api';
import { useSafeT } from '@shared/i18n/hooks';
import { useLocalizedRoutes } from '@shared/lib';
import { FormField, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import { Logo } from '@shared/ui/svg';
import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPasswordPage = () => {
    const tAuth = useSafeT('auth');
    const R = useLocalizedRoutes();
    const [sp] = useSearchParams();
    const navigate = useNavigate();
    const token = useMemo(() => sp.get('token') ?? '', [sp]);

    const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
    const [msg, setMsg] = useState<string>('');
    const schema = useMemo(() => createResetSchema(tAuth), [tAuth]);

    const methods = useForm({
        resolver: yupResolver<ResetParams>(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { password: '', confirm: '' },
    });

    const onSubmit = async ({ password }: ResetParams) => {
        if (!token) {
            setStatus('error');
            setMsg(tAuth('messages.token_missing'));
            return;
        }

        setStatus('idle');
        setMsg('');
        try {
            await resetPassword({ token, password });
            setStatus('ok');
            setMsg(tAuth('messages.password_updated'));
            setTimeout(() => navigate(R.signIn, { replace: true }), 1200);
        } catch (e: any) {
            setStatus('error');
            setMsg(e?.error || tAuth('messages.server_error'));
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
                    {tAuth('title.reset')}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {!token && (
                    <div
                        className="rounded bg-red-50 p-2 text-sm text-red-600 text-center dark:bg-red-500/10 dark:text-red-400 mb-4">
                        {tAuth('messages.token_missing')}
                    </div>
                )}

                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-6">
                    <FormProvider {...methods}>
                        <FormField
                            name="password"
                            label={tAuth('fields.password')}
                            placeholder={tAuth('placeholders.password')}
                            type="password"
                            autoComplete="new-password"
                        />
                        <FormField
                            name="confirm"
                            label={tAuth('fields.confirm')}
                            placeholder={tAuth('placeholders.confirm')}
                            type="password"
                            autoComplete="new-password"
                        />
                    </FormProvider>

                    {status !== 'idle' && (
                        <div
                            className={
                                status === 'ok'
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
                        disabled={methods.formState.isSubmitting || !token}
                        className="w-full text-sm/6 font-semibold"
                    >
                        {tAuth('buttons.update_password')}
                    </ThemedButton>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    {tAuth('links.back')}{' '}
                    <ThemedText as={Link} to={R.signIn} className="font-semibold hover:underline">
                        {tAuth('links.signin')}
                    </ThemedText>
                </p>
            </div>
        </div>
    );
};
