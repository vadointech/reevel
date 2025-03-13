import { CacheConfig } from "./types";

export const Caches = {
    Runtime: "sw-runtime",
    Precache: "sw-precache",

    StaticJS: "sw-static-js",
    StaticCSS: "sw-static-css",
    StaticFonts: "sw-fonts",
    StaticImage: "sw-static-image",

    NextImage: "sw-next-image",

    Routes: "sw-routes",
    RoutesRSC: "sw-routes-rsc",
};

export type Caches = ObjectValues<typeof Caches>;

export default [
    {
        cache: Caches.NextImage,
        validator: /\/_next\/image\?url=.+$/i,
        strategy: "staleWhileRevalidate",
        params: {},
    },
    {
        cache: Caches.StaticImage,
        validator: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        strategy: "cacheFirst",
        params: {},
    },
    {
        cache: Caches.StaticJS,
        validator: /\.js$/i,
        strategy: "staleWhileRevalidate",
        params: {},
    },
    {
        cache: Caches.StaticCSS,
        validator: /\.css$/i,
        strategy: "staleWhileRevalidate",
        params: {},
    },
    {
        cache: Caches.StaticFonts,
        validator: /\.woff2$/i,
        strategy: "cacheFirst",
        params: {},
    },
] satisfies CacheConfig;