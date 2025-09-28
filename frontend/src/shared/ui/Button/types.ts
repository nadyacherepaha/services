import { ButtonHTMLAttributes, FC } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: FC<{ className?: string }>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}
