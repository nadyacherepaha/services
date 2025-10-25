import { PRESET_HEX, ThemeColorId } from '@entities/themeColor/themeColors';
import { pickReadableTextColor, shadeHex, withAlpha } from '@shared/utils';
import React, { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

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

    const primaryHex = useMemo(() => {
        if (color === 'custom' && hex) return hex;
        if (color !== 'custom') return PRESET_HEX[color] ?? PRESET_HEX.blue;
        return PRESET_HEX.blue;
    }, [color, hex]);

    const tokens = useMemo(() => {
        const onPrimary = pickReadableTextColor(primaryHex, dark);
        const hover = shadeHex(primaryHex, -0.07);
        const ring = withAlpha(primaryHex, 0.5);
        return { onPrimary, hover, ring };
    }, [primaryHex, dark]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', primaryHex);
        root.style.setProperty('--on-primary', tokens.onPrimary);
        root.style.setProperty('--c-primary-hover', tokens.hover);
        root.style.setProperty('--c-primary-ring', tokens.ring);
    }, [primaryHex, tokens]);

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
