import { PrefOptions } from './types';

export function pickReadableTextColor(
    bgHex: string,
    isDarkTheme: boolean,
    {
        preferThresholdLight = 3.0,
        preferThresholdDark = 3.0,
        hardAA = 4.5,
        epsilon = 0.3,
    }: PrefOptions = {}): '#000000' | '#FFFFFF' {
    const hex = bgHex.replace('#', '');
    if (hex.length !== 6) return '#000000';

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

    const contrastWhite = (1.0 + 0.05) / (L + 0.05);
    const contrastBlack = (L + 0.05) / 0.05;

    if (isDarkTheme) {
        if (contrastBlack >= preferThresholdDark) return '#000000';
        if (contrastWhite >= hardAA) return '#FFFFFF';
        if (Math.abs(contrastBlack - contrastWhite) <= epsilon) return '#000000';
        return contrastBlack > contrastWhite ? '#000000' : '#FFFFFF';
    } else {
        if (contrastWhite >= preferThresholdLight) return '#FFFFFF';
        if (contrastBlack >= hardAA) return '#000000';
        if (Math.abs(contrastWhite - contrastBlack) <= epsilon) return '#FFFFFF';
        return contrastWhite > contrastBlack ? '#FFFFFF' : '#000000';
    }
}

function clamp01(n: number) {
    return Math.min(1, Math.max(0, n));
}

function toHex(n: number) {
    return Math.round(n).toString(16).padStart(2, '0');
}

function parseHex6(hex: string) {
    const h = hex.replace('#', '');
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

export function shadeHex(hex: string, amount: number) {
    const { r, g, b } = parseHex6(hex);
    const shade = (c: number) => clamp01(c / 255 + amount) * 255;
    return '#' + toHex(shade(r)) + toHex(shade(g)) + toHex(shade(b));
}

export function withAlpha(hex: string, alpha: number) {
    const { r, g, b } = parseHex6(hex);
    const a = clamp01(alpha);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
