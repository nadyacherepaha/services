import { HTMLInputTypeAttribute } from 'react';

export type Props = {
    name: string;
    label: string;
    type?: HTMLInputTypeAttribute;
    autoComplete?: string;
    optional?: boolean;
    placeholder?: string;
};
