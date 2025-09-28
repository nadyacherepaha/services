import clsx from 'clsx';
import { useTheme } from 'features/theme/model/useTheme';
import React, { FC } from 'react';
import { ThemedIconProps, ThemedIconSize } from './types';

const sizeMap: Record<ThemedIconSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
};

export const ThemedIcon: FC<ThemedIconProps> = ({ children, className, size = 'md', ...rest }) => {
    const { color } = useTheme();
    const isCustom = color === 'custom';
    const c = isCustom ? 'primary' : color;

    const themedClass = isCustom ? 'text-primary' : `text-${c}-500 dark:text-${c}-400`;

    return (
        <span className={clsx('inline-flex items-center justify-center', themedClass, sizeMap[size], className)} {...rest}>
            {children}
        </span>
    );
};
