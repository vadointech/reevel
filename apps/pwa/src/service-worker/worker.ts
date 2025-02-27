import {
    Caches,
    matcher,
    cacheService,
    cacheStrategies,
} from "./cache";

export declare const PRECACHE_ENTRIES: string[];

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheService.precacheStatic(PRECACHE_ENTRIES)
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("fetch", async(event: FetchEvent) => {
    const request = event.request;

    if (request.method !== "GET") return;

    if(matcher(request.url, Caches.NextImage)) {
        return event.respondWith(
            cacheStrategies.staleWhileRevalidate.apply(event, {
                cacheName: Caches.NextImage,
            }),
        );
    }

    if(matcher(request.url, Caches.StaticImage)) {
        return event.respondWith(
            cacheStrategies.cacheFirst.apply(event, {
                cacheName: Caches.StaticImage,
            }),
        );
    }

    if(matcher(request.url, Caches.StaticFonts)) {
        return event.respondWith(
            cacheStrategies.cacheFirst.apply(event, {
                cacheName: Caches.StaticFonts,
            }),
        );
    }

    if(matcher(request.url, Caches.StaticJS)) {
        return event.respondWith(
            cacheStrategies.staleWhileRevalidate.apply(event, {
                cacheName: Caches.StaticJS,
            }),
        );
    }

    if(matcher(request.url, Caches.StaticCSS)) {
        return event.respondWith(
            cacheStrategies.staleWhileRevalidate.apply(event, {
                cacheName: Caches.StaticCSS,
            }),
        );
    }

    event.respondWith(fetch(event.request));
});

self.addEventListener("message", (event: MessageEvent) => {
    if(event.data === "PRECACHE_ROUTES") {
        console.log("PRECACHE_ROUTES", event.data);
    }
});