import i18n, { FALLBACK_LNG, SUPPORTED_LANGS } from '@shared/i18n';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';

function isSupported(lng: string | undefined) {
    return !!lng && SUPPORTED_LANGS.includes(lng as any);
}

export function RootRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const detected = i18n.services.languageDetector?.detect() as string | undefined;
        const lng = isSupported(detected) ? (detected as any) : FALLBACK_LNG;
        navigate(`/${lng}`, { replace: true });
    }, [navigate]);
    return null;
}

export function LngGuard() {
    const { lng } = useParams<{ lng: string }>();

    if (!isSupported(lng)) {
        return <Navigate to={`/${FALLBACK_LNG}`} replace/>;
    }

    useEffect(() => {
        if (i18n.language !== lng) i18n.changeLanguage(lng);
    }, [lng]);

    return <Outlet/>;
}
