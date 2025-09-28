import { useTheme } from '@features/theme/model/useTheme';
import React from 'react';

export const ThemeSwitcher = () => {
    const { theme, toggleDark } = useTheme();

    return (
        <button
            onClick={toggleDark}
            className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    );
};
