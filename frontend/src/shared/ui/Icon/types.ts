import { HTMLAttributes, ReactNode } from 'react';

export type ThemedIconSize = 'sm' | 'md' | 'lg';

export interface ThemedIconProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    size?: ThemedIconSize;
}
