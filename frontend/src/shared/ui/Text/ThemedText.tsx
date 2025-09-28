import clsx from 'clsx';
import { useTheme } from 'features/theme/model/useTheme';
import React, { FC } from 'react';
import { ThemedTextProps } from './types';

export const ThemedText: FC<ThemedTextProps> = ({
    as = 'span',
    children,
    className,
    underline,
    ...rest
}) => {
    const { color } = useTheme();
    const isCustom = color === 'custom';
    const c = isCustom ? 'primary' : color;

    const Tag = as as any;

    const themedClass = isCustom
        ? 'text-primary'
        : `text-${c}-500 dark:text-${c}-400`;

    const underlineClass = underline ? 'underline decoration-current' : undefined;

    return (
        <Tag className={clsx(themedClass, underlineClass, className)} {...rest}>
            {children}
        </Tag>
    );
};


