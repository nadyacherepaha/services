import { themeColors } from '@entities/themeColor';
import { useTheme } from '@features/theme';
import { ThemedBox } from '@shared/ui';
import { pickReadableTextColor } from '@shared/utils';
import clsx from 'clsx';
import React, { FC, useRef, useState } from 'react';

export const ThemePicker: FC = () => {
    const { color, hex, setColor, darkMode } = useTheme();
    const [customInput, setCustomInput] = useState(hex || '#6B7280');
    const colorInputRef = useRef<HTMLInputElement>(null);

    const updateCustomColor = (value: string) => {
        setCustomInput(value);

        const onPrimary = pickReadableTextColor(value, darkMode, {
            preferThresholdLight: 3.0,
            preferThresholdDark: 3.0,
            hardAA: 4.5,
            epsilon: 0.3,
        });

        setColor('custom', value);

        const root = document.documentElement;
        root.style.setProperty('--color-primary', value);
        root.style.setProperty('--on-primary', onPrimary);
        root.style.setProperty('--c-primary-hover', value);
        root.style.setProperty('--c-primary-ring', `${value}80`);
    };

    const openColorPicker = () => {
        setColor('custom', customInput);
        const el = colorInputRef.current;
        if (el?.showPicker) el.showPicker();
        else el?.click();
    };

    return (
        <ThemedBox as="div" tint="soft" className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Theme Color
                </h4>

                <div className="flex gap-2 mt-2">
                    {themeColors.map((c) => (
                        <div className="flex items-center" key={c.id}>
                            {c.id === 'custom' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={openColorPicker}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                openColorPicker();
                                            }
                                        }}
                                        aria-label="Custom color"
                                        aria-pressed={color === 'custom'}
                                        style={{ backgroundColor: customInput }}
                                        className={clsx(
                                            'w-8 h-8 rounded focus:ring-2 focus:ring-offset-2 transition',
                                            color === 'custom'
                                                ? 'ring-2 ring-offset-1 ring-[var(--c-primary-ring)]'
                                                : 'ring-1 ring-transparent'
                                        )}
                                        title="Custom color"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 select-none">
                                        Custom
                                    </span>

                                    <input
                                        ref={colorInputRef}
                                        type="color"
                                        value={customInput}
                                        onChange={(e) => updateCustomColor(e.target.value)}
                                        className="sr-only absolute w-px h-px opacity-0 pointer-events-none"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                    />
                                </>
                            ) : (
                                <button
                                    onClick={() => setColor(c.id)}
                                    style={{ backgroundColor: c.hex }}
                                    className={clsx(
                                        'w-8 h-8 rounded focus:ring-2 focus:ring-offset-2 transition',
                                        color === c.id
                                            ? 'ring-2 ring-offset-1 ring-[var(--c-primary-ring)]'
                                            : 'ring-1 ring-transparent'
                                    )}
                                    aria-label={c.name}
                                    title={c.name}
                                    aria-pressed={color === c.id}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </ThemedBox>
    );
};
