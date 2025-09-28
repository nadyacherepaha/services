import { HTMLAttributes, ReactNode } from 'react';

export type ThemedTextAs = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';

export interface ThemedTextProps extends HTMLAttributes<HTMLElement> {
    as?: ThemedTextAs;
    children: ReactNode;
    underline?: boolean;
}
