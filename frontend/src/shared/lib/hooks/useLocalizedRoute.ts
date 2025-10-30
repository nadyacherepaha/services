import { routes } from '@shared/lib';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useLocalizedRoutes = () => {
    const { i18n } = useTranslation();

    return useMemo(() => {
        const prefix = `/${i18n.language}`;

        return Object.fromEntries(
            Object.entries(routes).map(([key, value]) => [key, `${prefix}${value}`])
        ) as typeof routes;
    }, [i18n.language]);
};
