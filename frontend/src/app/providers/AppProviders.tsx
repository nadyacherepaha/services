import { AuthProvider } from '@app/providers';
import { ThemeProvider } from '@features/theme/model/useTheme';
import React, { ReactNode } from 'react';

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
};
