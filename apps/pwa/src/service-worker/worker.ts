import cacheConfig, { Caches } from "./cache/cache.config";
import cacheStrategies from "./cache/cache.strategies";
import cacheService from "./cache/cache.service";

declare const PRECACHE_ENTRIES: string[];

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(
        cacheService.precacheStatic(PRECACHE_ENTRIES)
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(
        self.clients.claim(),
    );
});

self.addEventListener("fetch", async(event: FetchEvent) => {
    const request = event.request;
    const requestUrl = new URL(request.url);

    if (request.method !== "GET") return;

    for(const {cache, validator, strategy, params} of cacheConfig) {
        if(request.url.match(validator)) {
            return event.respondWith(
                cacheStrategies[strategy].apply(event, { cacheName: cache, ...params }),
            );
        }
    }

    if(requestUrl.origin === self.origin) {
        if(request.headers.get("RSC") === "1") {
            return event.respondWith(
                cacheStrategies.networkFirst.apply(event, {
                    cacheName: Caches.RoutesRSC,
                }),
            );
        }
        
        return event.respondWith(
            cacheStrategies.networkFirst.apply(event, {
                cacheName: Caches.Routes,
            }),
        );
    }
});

self.addEventListener("message", async(event: MessageEvent) => {
    if(event.data && event.data.type === "CACHE_ROUTE") {
        const cache = await caches.open(Caches.Routes);
        const url = event.data.payload as string;

        if(!url) return;

        const request = new Request(url);

        const exist = await cache.match(url);
        if (exist) return;

        const response = await fetch(request);
        if (!response.ok) return;

        return cacheService.addOne(cache, request, response);
    }
});