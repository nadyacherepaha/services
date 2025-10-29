import { useTheme } from '@features/theme/model/useTheme';
import clsx from 'clsx';
import React, { FC } from 'react';
import { ThemedIconProps, ThemedIconSize, Tone } from './types';

const sizeMap: Record<ThemedIconSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    custom: '',
};

export const ThemedIcon: FC<ThemedIconProps & { tone?: Tone }> = ({
    children,
    className,
    size = 'md',
    tone = 'accent',
    ...rest
}) => {
    useTheme();

    const themedClass =
        tone === 'onPrimary'
            ? 'text-[var(--on-primary)]'
            : 'text-[var(--color-primary)]';

    return (
        <span
            className={clsx('inline-flex items-center justify-center', themedClass, sizeMap[size], className)}
            {...rest}
        >
      {children}
    </span>
    );
};
