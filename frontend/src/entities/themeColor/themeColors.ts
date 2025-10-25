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

export const PRESET_HEX: Record<Exclude<ThemeColorId, 'custom'>, string> = {
    blue: '#2563EB',
    coral: '#C47464',
    purple: '#8E79F3',
    pink: '#DB7093',
    teal: '#619280',
    beige: '#9B8568',
};

export const themeColors: ThemeColor[] = [
    { id: 'blue', name: 'Blue', hex: PRESET_HEX.blue },
    { id: 'coral', name: 'Coral', hex: PRESET_HEX.coral },
    { id: 'purple', name: 'Purple', hex: PRESET_HEX.purple },
    { id: 'pink', name: 'Pink', hex: PRESET_HEX.pink },
    { id: 'teal', name: 'Teal', hex: PRESET_HEX.teal },
    { id: 'beige', name: 'Beige', hex: PRESET_HEX.beige },
    { id: 'custom', name: 'Custom', hex: '' },
];
