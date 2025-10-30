import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type SafeT = (key: string, opts?: Record<string, unknown>) => string;

export const useSafeT = (ns?: string): SafeT => {
    const { i18n } = useTranslation();
    return useMemo(
        () => i18n.getFixedT(i18n.language, ns),
        [i18n.language, i18n, ns]
    );
};
