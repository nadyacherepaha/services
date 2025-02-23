import { AuthProvider } from 'context/AuthContext';
import React from 'react';
import './App.css';
import AppRoutes from './routes/index';

const App = () => {
    return (
        <AuthProvider>
            <AppRoutes/>
        </AuthProvider>
    );
};

export default App;
