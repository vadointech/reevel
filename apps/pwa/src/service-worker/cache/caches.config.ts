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