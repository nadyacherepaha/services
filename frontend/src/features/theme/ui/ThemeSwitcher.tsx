import { useTheme } from '@features/theme/model/useTheme';
import React from 'react';

export const ThemeSwitcher = () => {
    const { darkMode, toggleDark } = useTheme();

    return (
        <button
            onClick={toggleDark}
            aria-pressed={darkMode}
            className={
                'relative inline-flex items-center w-40 h-14 md:w-40 md:h-14 rounded-full transition-colors duration-300 shadow m-2 ' +
                (darkMode ? 'bg-black text-white' : 'bg-zinc-200 text-black')
            }
        >
            <span
                className={
                    'absolute top-1/2 -translate-y-1/2 h-10 w-10 md:h-10 md:w-10 rounded-full shadow transition-transform duration-300 ease-in-out overflow-hidden ' +
                    (darkMode ? 'translate-x-2' : 'translate-x-[6.9rem] md:translate-x-[6.9rem]')
                }
            >
                <span className={
                    'absolute inset-0 rounded-full bg-white transition-opacity duration-300 ease-in-out ' +
                    (darkMode ? 'opacity-100' : 'opacity-0')
                }/>
                <span className={
                    'absolute inset-0 rounded-full bg-black transition-opacity duration-300 ease-in-out ' +
                    (darkMode ? 'opacity-0' : 'opacity-100')
                }/>
            </span>

            <div className="relative z-10 flex w-full items-center justify-between px-[0.47rem]">
                <span className="flex items-center justify-center h-10 w-10">
                    {darkMode ? (
                        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="black" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                        </svg>
                    ) : (
                        <span/>
                    )}
                </span>

                <span
                    className="relative h-5 md:h-6 ml-[-2.75rem] mt-[-0.9rem] inline-flex items-center justify-center">
                    <span className={
                        'absolute inset-0 font-semibold tracking-wide text-sm md:text-sm select-none transition-opacity duration-300 ease-in-out ' +
                        (darkMode ? 'opacity-100' : 'opacity-0')
                    }>
                        NIGHT MODE
                    </span>
                    <span className={
                        'absolute inset-0 font-semibold tracking-wide text-sm md:text-sm select-none transition-opacity duration-300 ease-in-out ' +
                        (darkMode ? 'opacity-0' : 'opacity-100')
                    }>
                        DAY MODE
                    </span>
                </span>

                <span className="flex items-center justify-center h-10 w-10">
                    {!darkMode ? (
                        <svg viewBox="0 0 24 24" className="h-8 w-8 pr-[4px]" fill="white" stroke="white"
                             strokeWidth="2">
                            <circle cx="12" cy="12" r="4" fill="white"/>
                            <path
                                d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M17.66 6.34l1.41-1.41M4.93 19.07l1.41-1.41"/>
                        </svg>
                    ) : (
                        <span/>
                    )}
                </span>
            </div>
        </button>
    );
};
