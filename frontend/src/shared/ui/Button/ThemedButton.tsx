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

    const variantMap: Record<string, string> = {
        primary:
            'bg-[var(--color-primary)] text-[var(--on-primary)] ' +
            'hover:bg-[var(--c-primary-hover)] focus:ring-2 focus:ring-[var(--c-primary-ring)]',
        outline:
            'border border-[color:var(--color-primary)] text-[var(--color-primary)] ' +
            'hover:bg-black/5 focus:ring-2 focus:ring-[var(--c-primary-ring)]',
        text:
            'text-[var(--color-primary)] hover:bg-black/5 ' +
            'focus:ring-2 focus:ring-[var(--c-primary-ring)]',
    };

    const classes = clsx(
        base,
        sizes[size],
        variantMap[variant],
        { 'opacity-50 cursor-not-allowed': disabled || loading },
        className
    );

    return (
        <button
            className={classes}
            data-theme-color={color}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
                    viewBox="0 0 24 24"
                >
                    <circle
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                        className="opacity-25"
                    />
                    <path
                        fill="currentColor" className="opacity-75"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
};
