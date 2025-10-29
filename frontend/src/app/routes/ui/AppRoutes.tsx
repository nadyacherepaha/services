import { RouteErrorReset } from '@shared/ui';
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';
import { router } from '../router';

export const AppRoutes = () => {
    return (
        <Router>
            <RouteErrorReset/>
            <Routes>
                {router.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element}/>
                ))}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>
    );
};
