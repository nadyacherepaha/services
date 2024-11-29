import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        ignores: ['dist', 'node_modules', '*.config.js'],
    },
    js.configs.recommended,
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            import: importPlugin,
            'react-hooks': reactHooks,
            '@typescript-eslint': typescriptEslintPlugin,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'never',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
];
