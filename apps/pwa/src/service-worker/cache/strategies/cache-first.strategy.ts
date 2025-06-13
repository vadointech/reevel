import { IStrategy } from "../types";
import { CacheService, CacheParams } from "../cache.service";

export class CacheFirst implements IStrategy {

    constructor(
        private readonly cacheService: CacheService,
    ) {}

    async apply(event: FetchEvent, params: CacheParams): Promise<Response> {
        return caches.open(params.cacheName).then(async cache => {
            const cachedResponse = await cache.match(event.request);

            // If the resource is in the cache, return it directly
            if (cachedResponse) {
                await this.cacheService.invalidateCache(cache, params);
                return cachedResponse;
            }

            return fetch(event.request.clone())
                .then(networkResponse => {
                    // Return the network response immediately
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
                        return networkResponse;
                    }

                    // Cache the network response for future requests
                    return caches.open(params.cacheName)
                        .then(cache => {
                            this.cacheService.addOne(cache, event.request, networkResponse.clone(), params);
                            return networkResponse;
                        });
                })
                .catch(() => {
                    // console.error("Fetch failed:", error);

                    // TODO: Return a custom offline page
                    // return caches.match('/offline.html');

                    return new Response("Network request failed", {
                        status: 503,
                        statusText: "Service Unavailable",
                    });
                });
        });
    }
}