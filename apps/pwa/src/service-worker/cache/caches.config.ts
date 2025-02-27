export const Caches = {
    Runtime: "sw-runtime",
    Precache: "sw-precache",

    StaticJS: "sw-static-js",
    StaticCSS: "sw-static-css",
    StaticFonts: "sw-fonts",
    StaticImage: "sw-static-image",

    NextImage: "sw-next-image",
};

export type Caches = ObjectValues<typeof Caches>;

export const matches: [RegExp, Caches][] = [
    [/\.js$/i, Caches.StaticJS],
    [/\.css$/i, Caches.StaticCSS],
    [/\.ttf$/i, Caches.StaticFonts],
    [/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, Caches.StaticImage],

    [/\/_next\/image\?url=.+$/i, Caches.NextImage],
];

export function matcher(url: string, cache: Caches): boolean {
    return matches.some(([regex, cacheType]) => regex.test(url) && cacheType === cache);
}