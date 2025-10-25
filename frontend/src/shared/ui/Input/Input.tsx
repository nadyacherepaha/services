import clsx from 'clsx';
import React, { FC } from 'react';
import { InputProps } from './types';

export const Input: FC<InputProps> = ({ className, ...rest }) => (
    <input
        className={clsx(
            'block w-full rounded-md bg-white dark:bg-white/5 px-3 py-1.5 text-base sm:text-sm/6',
            'border border-zinc-300 dark:border-zinc-700 dark:text-white',
            'placeholder:text-gray-500',
            'caret-[var(--color-primary)] selection:bg-[color-mix(in_srgb,var(--color-primary)_25%,transparent)] selection:text-[var(--on-primary)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--c-primary-ring)] focus:border-[var(--color-primary)]',
            className
        )}
        {...rest}
    />
);
