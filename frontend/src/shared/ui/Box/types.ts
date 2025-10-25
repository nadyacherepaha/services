import { HTMLAttributes, ReactNode } from 'react';

export type ThemedBoxAs = 'div' | 'section' | 'article' | 'header' | 'footer' | 'aside' | 'main';
export type ThemedBoxTint = 'solid' | 'soft' | 'transparent';

export interface ThemedBoxProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    as?: ThemedBoxAs;
    tint?: ThemedBoxTint;
}
