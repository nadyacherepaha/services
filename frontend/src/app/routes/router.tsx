import { LoginPage, RegisterPage } from '@pages/auth';
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
    }
];
