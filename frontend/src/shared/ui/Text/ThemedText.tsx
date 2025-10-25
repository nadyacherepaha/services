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
    useTheme();

    const Tag = as as any;
    const themedClass = 'text-[var(--color-primary)]';
    const underlineClass = underline ? 'underline decoration-current' : undefined;

    return (
        <Tag className={clsx(themedClass, underlineClass, className)} {...rest}>
            {children}
        </Tag>
    );
};
