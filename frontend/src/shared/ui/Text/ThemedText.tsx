import { useTheme } from '@features/theme/model/useTheme';
import clsx from 'clsx';
import React, { ElementType, forwardRef } from 'react';
import { PolymorphicRef, ThemedTextProps } from './types';

export const ThemedText = forwardRef(
    <E extends ElementType = 'span'>(
        { as, underline, className, children, ...rest }: ThemedTextProps<E>,
        ref: PolymorphicRef<E>
    ) => {
        useTheme();
        const Tag = (as ?? 'span') as ElementType;
        const themedClass = 'text-[var(--color-primary)]';
        const underlineClass = underline ? 'underline decoration-current' : undefined;

        return (
            <Tag ref={ref} className={clsx(themedClass, underlineClass, className)} {...rest}>
                {children}
            </Tag>
        );
    }
);
