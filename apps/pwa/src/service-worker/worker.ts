import { precacheStaticAssets } from "@/service-worker/handlers";
import { Caches, matcher } from "@/service-worker/cache";
import { StaleWhileRevalidate, CacheFirst, applyStrategy } from "./strategies";
import { createContext } from "@/service-worker/context";

declare const VERSION: string;
declare const PRECACHE_ENTRIES: string[];

const ctx = createContext({
    swVersion: VERSION,
    cacheEnabled: true,
});

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        precacheStaticAssets(ctx, PRECACHE_ENTRIES)
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("fetch", async(event: FetchEvent) => {
    const request = event.request;

    if (request.method !== "GET") return;

    if(matcher(request.url, Caches.NextImage)) {
        return event.respondWith(applyStrategy(
            event,
            new StaleWhileRevalidate(ctx, {
                cacheName: Caches.NextImage,
                ttl: 4000,
            }),
        ));
    }

    if(matcher(request.url, Caches.StaticImage)) {
        return event.respondWith(applyStrategy(
            event,
            new CacheFirst(ctx, {
                cacheName: Caches.StaticImage,
            }),
        ));
    }

    if(matcher(request.url, Caches.StaticFonts)) {
        return event.respondWith(applyStrategy(
            event,
            new CacheFirst(ctx, {
                cacheName: Caches.StaticFonts,
            }),
        ));
    }

    if(matcher(request.url, Caches.StaticJS)) {
        return event.respondWith(applyStrategy(
            event,
            new StaleWhileRevalidate(ctx, {
                cacheName: Caches.StaticJS,
            }),
        ));
    }

    if(matcher(request.url, Caches.StaticCSS)) {
        return event.respondWith(applyStrategy(
            event,
            new StaleWhileRevalidate(ctx, {
                cacheName: Caches.StaticCSS,
            }),
        ));
    }

    event.respondWith(fetch(event.request));
});

self.addEventListener("message", (event: MessageEvent) => {
    if(event.data === "PRECACHE_ROUTES") {
        console.log("PRECACHE_ROUTES", event.data);
    }
});