import '@shared/i18n';
import { RouteErrorReset } from '@shared/ui';
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';
import { router } from '../router';
import { LngGuard, RootRedirect } from './i18n-router';

export const AppRoutes = () => {
    return (
        <Router>
            <RouteErrorReset/>
            <Routes>
                <Route path="/" element={<RootRedirect/>}/>
                <Route path=":lng" element={<LngGuard/>}>
                    {router.map((route) => {
                        const childPath = route.path.replace(/^\//, '');
                        return <Route key={route.path} path={childPath} element={route.element}/>;
                    })}
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Route>
            </Routes>
        </Router>
    );
};
