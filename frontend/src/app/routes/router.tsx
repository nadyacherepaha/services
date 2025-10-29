import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage } from '@pages/auth';
import { HomePage } from '@pages/home';
import { routes } from '@shared/lib';
import React from 'react';

export const router = [
    {
        path: routes.signIn,
        element: <LoginPage/>,
    },
    {
        path: routes.signUp,
        element: <RegisterPage/>,
    },
    {
        path: routes.home,
        element: <HomePage/>,
    },
    {
        path: routes.forgotPassword,
        element: <ForgotPasswordPage/>,
    },
    {
        path: routes.resetPassword,
        element: <ResetPasswordPage/>,
    }
];
