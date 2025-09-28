// import '@app/App.css';
import { AppProviders } from '@app/providers';
import { AppRoutes } from '@app/routes';
import { ThemeSwitcher } from '@features/theme';
import React from 'react';

const App = () => {
    return (
        <AppProviders>
            <div className="text-black bg-white dark:text-white dark:bg-zinc-900">
                <AppRoutes/>
                <ThemeSwitcher/>
            </div>
        </AppProviders>
    );
};

export default App;
