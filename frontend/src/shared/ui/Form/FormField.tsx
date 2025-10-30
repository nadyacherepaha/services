import { Input } from '@shared/ui';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Props } from './types';

export const FormField: FC<Props> = ({
    name, label, type = 'text', autoComplete, optional, labelRight, helper, placeholder,
}) => {
    const { register, formState: { errors } } = useFormContext();
    const err = (errors as any)[name]?.message as string | undefined;
    const id = name;

    return (
        <div>
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="block text-sm/6 font-medium dark:text-gray-100">
                    {label}{optional ? '' : '*'}
                </label>
                {labelRight}
            </div>

            <div className="mt-2">
                <Input
                    id={id}
                    type={type}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    aria-invalid={!!err || undefined}
                    aria-describedby={err ? `${id}-error` : undefined}
                    {...register(name as any, { required: !optional })}
                />
                {helper && !err && (
                    <div className="mt-1 text-xs text-gray-500">{helper}</div>
                )}
                {err && (
                    <span id={`${id}-error`} className="text-sm text-red-500">
                        {err}
                    </span>
                )}
            </div>
        </div>
    );
};
