/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

const themeIds = ['blue', 'coral', 'purple', 'pink', 'teal', 'beige',];

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
    theme: {
        extend: {
            colors: {
                blue: {
                    500: colors.blue[500],
                    600: colors.blue[600],
                    700: colors.blue[700],
                },
                coral: {
                    500: '#F28F7B',
                    600: '#E06D6A',
                    700: '#CF5B59',
                },
                purple: {
                    500: colors.violet[500],
                    600: colors.violet[600],
                    700: colors.violet[700],
                },
                pink: {
                    500: colors.fuchsia[500],
                    600: colors.fuchsia[600],
                    700: colors.fuchsia[700],
                },
                teal: {
                    500: colors.teal[500],
                    600: colors.teal[600],
                    700: colors.teal[700],
                },
                beige: {
                    500: '#D2B48C',
                    600: '#C3A575',
                    700: '#B4945E',
                },
                primary: 'var(--color-primary)',
            }
        }
    },
    darkMode: 'class',
    safelist: [
        {
            pattern: new RegExp(`bg-(${themeIds.join('|')})-(500|600|700)`),
            variants: ['hover', 'focus', 'active', 'dark', 'dark:hover', 'dark:active']
        },
        {
            pattern: new RegExp(`bg-(${themeIds.join('|')})-50`),
            variants: ['dark']
        },
        {
            pattern: new RegExp(`border-(${themeIds.join('|')})-(500|600|700)`),
            variants: ['hover', 'focus', 'dark']
        },
        {
            pattern: new RegExp(`text-(${themeIds.join('|')})-(500|600)`),
            variants: ['hover', 'focus', 'dark']
        },
        'bg-primary',
        'bg-primary/10',
        'hover:bg-primary/90',
        'active:bg-primary/80',
        'focus:ring-primary/50',
        'text-primary'
    ],
    plugins: [],
};
