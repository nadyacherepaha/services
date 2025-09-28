import { themeColors } from '@entities/themeColor/themeColors';
import { useTheme } from '@features/theme';
import React, { FC, useState } from 'react';

export const ThemePicker: FC = () => {
    const { color, hex, setColor, darkMode, toggleDark } = useTheme();
    const [customInput, setCustomInput] = useState(hex);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Theme Color</h4>
                <div className="flex gap-2 mt-2">
                    {themeColors.map(c => (
                        <div className="flex items-center">
                            {c.id === 'custom' && <span className="text-zinc-700 mr-2">Pick Custom Color:</span>}
                            <button
                                key={c.id}
                                onClick={() => {
                                    if (c.id === 'custom') {
                                        setColor('custom', customInput);
                                    } else {
                                        setColor(c.id);
                                    }
                                }}
                                style={{ backgroundColor: c.id === 'custom' ? customInput || '#000' : c.hex }}
                                className={
                                    `w-8 h-8 rounded focus:ring-2 focus:ring-offset-2 ` +
                                    (color === c.id
                                        ? 'ring-2 ring-offset-1 ring-gray-700'
                                        : 'ring-1 ring-transparent')
                                }
                                aria-label={c.name}
                            />
                        </div>
                    ))}

                    {color === 'custom' && (
                        <input
                            type="color"
                            className="w-8 h-8 p-0 border-0"
                            value={customInput}
                            onChange={e => setCustomInput(e.target.value)}
                            onBlur={() => setColor('custom', customInput)}
                        />
                    )}
                </div>
            </div>

            <label className="inline-flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDark}
                    className="form-checkbox h-5 w-5 text-primary dark:text-indigo-400"
                />
                <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
            </label>
        </div>
    );
};
