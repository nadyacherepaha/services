export type ThemeColorId =
    | 'blue'
    | 'coral'
    | 'purple'
    | 'pink'
    | 'teal'
    | 'beige'
    | 'custom'

export interface ThemeColor {
    id: ThemeColorId;
    name: string;
    hex: string;
}

export const themeColors: ThemeColor[] = [
    { id: 'blue', name: 'Blue', hex: '#2563EB' },
    { id: 'coral', name: 'Coral', hex: '#F28F7B' },
    { id: 'purple', name: 'Purple', hex: '#8E79F3' },
    { id: 'pink', name: 'Pink', hex: '#DB7093' },
    { id: 'teal', name: 'Teal', hex: '#7FC0A8' },
    { id: 'beige', name: 'Beige', hex: '#D2B48C' },
    { id: 'custom', name: 'Custom', hex: '' },
];
