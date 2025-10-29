import React, { ElementType } from 'react';

export type ThemedTextOwnProps = {
    underline?: boolean;
    children: React.ReactNode;
    className?: string;
};

export type PolymorphicRef<E extends ElementType> =
    React.ComponentPropsWithRef<E>['ref'];

export type PolymorphicProps<E extends ElementType, P> =
    P & { as?: E } &
    Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as' | 'color'>;

export type ThemedTextProps<E extends ElementType = 'span'> =
    PolymorphicProps<E, ThemedTextOwnProps>;
