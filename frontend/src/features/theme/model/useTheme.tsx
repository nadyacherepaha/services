import { ThemeColorId } from '@entities/themeColor/themeColors';
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

interface ThemeContext {
    color: ThemeColorId;
    hex: string;
    setColor: (id: ThemeColorId, customHex?: string) => void;
    darkMode: boolean;
    toggleDark: () => void;
}

const Context = createContext<ThemeContext | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const storedColor = (localStorage.getItem('theme-color') as ThemeColorId) || 'blue';
    const storedHex = localStorage.getItem('theme-hex') || '';
    const storedDark = localStorage.getItem('dark-mode') === 'true';

    const [color, setColorState] = useState<ThemeColorId>(storedColor);
    const [hex, setHexState] = useState<string>(storedHex);
    const [dark, setDark] = useState<boolean>(storedDark);

    const setColor = (id: ThemeColorId, customHex?: string) => {
        localStorage.setItem('theme-color', id);
        setColorState(id);

        if (id === 'custom' && customHex) {
            localStorage.setItem('theme-hex', customHex);
            setHexState(customHex);
        } else {
            localStorage.removeItem('theme-hex');
            setHexState('');
        }
    };

    const toggleDark = () => {
        const next = !dark;
        localStorage.setItem('dark-mode', String(next));
        setDark(next);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (color === 'custom' && hex) {
            root.style.setProperty('--color-primary', hex);
        } else {
            root.style.removeProperty('--color-primary');
        }
    }, [color, hex]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    return (
        <Context.Provider value={{ color, hex, setColor, darkMode: dark, toggleDark }}>
            {children}
        </Context.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(Context);
    if (!context) throw new Error('useTheme must be inside ThemeProvider');
    return context;
};
