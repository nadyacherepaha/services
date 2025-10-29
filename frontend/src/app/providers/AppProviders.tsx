import { AppProvidersProps, AuthProvider } from '@app/providers';
import { ThemeProvider } from '@features/theme/model/useTheme';
import React, { FC } from 'react';

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};
