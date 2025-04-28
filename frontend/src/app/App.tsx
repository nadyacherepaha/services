import '@app/App.css';
import { AuthProvider } from '@app/providers';
import { AppRoutes } from '@app/routes';
import { ThemeSwitcher } from '@features/themeSwitcher';
import React from 'react';

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes/>
            <ThemeSwitcher/>
        </AuthProvider>
    );
};

export default App;
