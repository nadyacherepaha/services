import { HTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    size?: InputSize;
}
