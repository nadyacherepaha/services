import { ThemePicker } from '@features/theme';
import { ThemedBox, ThemedButton, ThemedIcon, ThemedText } from '@shared/ui';
import React from 'react';

export const HomePage = () => {
    return (
        <div className="text-white p-4 space-y-6">
            <h2 className="bg-zinc-400">Home Page</h2>

            <section className="space-y-2">
                <ThemedText as="h3" className="text-xl">Themed text examples</ThemedText>
                <p>
                    <ThemedText as="span">Themed span</ThemedText>
                    <span className="mx-2">|</span>
                    <ThemedText as="a" href="#" underline>themed link</ThemedText>
                    <span className="mx-2">|</span>
                    <ThemedText as="p" className="inline">Themed paragraph inline</ThemedText>
                </p>
            </section>

            <section className="space-y-2">
                <ThemedText as="h3" className="text-xl">Themed background blocks</ThemedText>
                <ThemedBox tint="soft" className="p-3 rounded">Soft themed background</ThemedBox>
                <ThemedBox tint="solid" className="p-3 rounded text-white">Solid themed background</ThemedBox>
            </section>

            <section className="space-y-2">
                <ThemedText as="h3" className="text-xl">Themed icon</ThemedText>
                <ThemedIcon size="lg">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10h3l-4 5-4-5h3V7h2v5z"/>
                    </svg>
                </ThemedIcon>
            </section>

            <section className="space-y-2">
                <ThemedText as="h3" className="text-xl">Buttons</ThemedText>
                <div>
                    <ThemedButton variant="primary" size="md">Hello primary</ThemedButton>
                    <ThemedButton variant="outline" size="sm" className="ml-2">Hello outline</ThemedButton>
                </div>
            </section>

            <ThemePicker/>
        </div>

    );
};
