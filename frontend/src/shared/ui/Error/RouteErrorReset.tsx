import { useAuth } from '@shared/lib';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteErrorReset() {
    const { pathname, search } = useLocation();
    const { clearError } = useAuth();

    useEffect(() => {
        clearError();
    }, [pathname, search]);

    return null;
}
