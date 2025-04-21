export const ImageColorPalette = {
    Vibrant: "Vibrant",
    DarkVibrant: "DarkVibrant",
    Muted: "Muted",
    DarkMuted: "DarkMuted",
} as const;
export type ImageColorPalette = keyof typeof ImageColorPalette;

export const ImageColorPalettePreset = {
    Default: "Default",
    Extended: "Extended",
} as const;
export type ImageColorPalettePreset = keyof typeof ImageColorPalettePreset;

export type ColorPaletteOptions = {
    palette?: ImageColorPalette[];
    preset?: ImageColorPalettePreset
};