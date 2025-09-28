import clsx from 'clsx';
import { useTheme } from 'features/theme/model/useTheme';
import React, { FC } from 'react';
import { ThemedBoxProps } from './types';

export const ThemedBox: FC<ThemedBoxProps> = ({
    as = 'div',
    children,
    className,
    tint = 'soft',
    ...rest
}) => {
    const { color } = useTheme();
    const isCustom = color === 'custom';
    const c = isCustom ? 'primary' : color;

    const Tag = as as any;

    const bgClass = isCustom
        ? (tint === 'solid' ? 'bg-primary' : 'bg-primary/10')
        : (tint === 'solid'
            ? `bg-${c}-500 dark:bg-${c}-400`
            : `bg-${c}-50 dark:bg-${c}-500/10`);

    return (
        <Tag className={clsx('rounded', bgClass, className)} {...rest}>
            {children}
        </Tag>
    );
};
