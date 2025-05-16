export const ImageColorPalette = {
    Vibrant: "Vibrant",
    DarkVibrant: "DarkVibrant",
    Muted: "Muted",
    DarkMuted: "DarkMuted",
} as const;
export type ImageColorPalette = keyof typeof ImageColorPalette;

export enum ImageColorPalettePreset {
    Single = "Single",
    Default = "Default",
    Extended = "Extended",
}

export type ColorPaletteOptions = {
    palette?: ImageColorPalette[];
    preset?: ImageColorPalettePreset
};