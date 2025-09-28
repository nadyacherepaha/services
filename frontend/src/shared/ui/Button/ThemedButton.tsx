import clsx from 'clsx';
import { useTheme } from 'features/theme/model/useTheme';
import React, { FC } from 'react';
import { ButtonProps } from './types';

export const ThemedButton: FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    className,
    ...props
}) => {
    const { color } = useTheme();

    const base = 'inline-flex items-center justify-center font-medium rounded focus:outline-none transition';
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const isCustom = color === 'custom';
    const c = isCustom ? 'primary' : color;

    const variantMap: Record<string, string> = {
        primary: isCustom
            ? 'bg-primary hover:bg-primary/90 active:bg-primary/80 focus:ring-2 focus:ring-primary/50'
            : `bg-${c}-500 hover:bg-${c}-600 active:bg-${c}-700 focus:ring-2 focus:ring-${c}-300 dark:bg-${c}-400 dark:hover:bg-${c}-500 dark:active:bg-${c}-600`,
        outline: isCustom
            ? 'border border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50'
            : `border border-${c}-500 text-${c}-500 hover:bg-${c}-50 focus:ring-2 focus:ring-${c}-300 dark:border-${c}-400 dark:text-${c}-400 dark:hover:bg-gray-800`,
        text: isCustom
            ? 'text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/50'
            : `text-${c}-500 hover:bg-${c}-50 focus:ring-2 focus:ring-${c}-300 dark:text-${c}-400 dark:hover:bg-gray-800`,
    };

    const classes = clsx(
        base,
        sizes[size],
        variantMap[variant],
        { 'opacity-50 cursor-not-allowed': disabled || loading },
        className
    );

    return (
        <button className={classes} disabled={disabled || loading} {...props}>
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                    <path fill="currentColor" className="opacity-75"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};
