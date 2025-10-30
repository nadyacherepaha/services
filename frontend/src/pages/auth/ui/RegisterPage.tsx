import { yupResolver } from '@hookform/resolvers/yup';
import { createRegisterSchema, type RegisterParams } from '@pages/auth/model';
import { useSafeT } from '@shared/i18n/hooks';
import { useAuth, useLocalizedRoutes } from '@shared/lib';
import { FormField, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import { Logo } from '@shared/ui/svg';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    const { register, error } = useAuth();
    const R = useLocalizedRoutes();
    const tAuth = useSafeT('auth');
    const schema = useMemo(() => createRegisterSchema(tAuth), [tAuth]);

    const methods = useForm({
        resolver: yupResolver<RegisterParams>(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { name: '', email: '', phone: '', socials: '', password: '' },
    });

    const onSubmit = async (data: RegisterParams) => {
        const { email, name, phone, password, socials } = data;
        await register({ email, name, phone, password, socials });
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
                        {tAuth('title.register')}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-6">
                        <FormProvider {...methods}>
                            <FormField name="name" label={tAuth('fields.name')} placeholder={tAuth('placeholders.name')}
                                       autoComplete="name"/>
                            <FormField name="email" label={tAuth('fields.email')}
                                       placeholder={tAuth('placeholders.email')} type="email" autoComplete="email"/>
                            <FormField name="phone" label={tAuth('fields.phone')}
                                       placeholder={tAuth('placeholders.phone')} type="tel" autoComplete="tel"/>
                            <FormField name="socials" label={tAuth('fields.socials')}
                                       placeholder={tAuth('placeholders.socials')} optional/>
                            <FormField name="password" label={tAuth('fields.password')}
                                       placeholder={tAuth('placeholders.password')} type="password"
                                       autoComplete="new-password"/>
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
                            {tAuth('buttons.register')}
                        </ThemedButton>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        {tAuth('links.already_have')}{' '}
                        <ThemedText as={Link} to={R.signIn} className="font-semibold hover:underline">
                            {tAuth('links.signin')}
                        </ThemedText>
                    </p>
                </div>
            </div>
        </div>
    );
};
