import { useTheme } from '@features/theme/model/useTheme';
import clsx from 'clsx';
import React, { FC } from 'react';
import { ThemedBoxProps } from './types';

export const ThemedBox: FC<ThemedBoxProps> = ({
    as = 'div',
    children,
    className,
    tint = 'soft',
    ...rest
}) => {
    useTheme();

    const Tag = as as any;
    const bgClass =
        tint === 'solid'
            ? 'bg-[var(--color-primary)] text-[var(--on-primary)]'
            : tint === 'soft'
                ? 'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] text-[var(--color-primary)] ' +
                'dark:bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)]'
                : 'bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] ' +
                'dark:bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]';

    return (
        <Tag
            className={clsx('rounded transition-colors', bgClass, className)}
            {...rest}
        >
            {children}
        </Tag>
    );
};
