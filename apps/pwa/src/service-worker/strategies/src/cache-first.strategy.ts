import { IStrategy, Strategy, StrategyOptions } from "./strategy";
import { Context } from "@/service-worker/context";

export class CacheFirst extends Strategy implements IStrategy {

    constructor(ctx: Context, options: StrategyOptions) {
        super(ctx, options);
    }

    async handle(event: FetchEvent): Promise<Response> {
        return caches.open(this.cacheName).then(async cache => {
            const cachedResponse = await cache.match(event.request);

            // If the resource is in the cache, return it directly
            if (cachedResponse) {
                await this.cacheService.invalidateCache(cache);
                return cachedResponse;
            }

            return fetch(event.request.clone())
                .then(networkResponse => {
                    // Return the network response immediately
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
                        return networkResponse;
                    }

                    // Cache the network response for future requests
                    return caches.open(this.cacheName)
                        .then(cache => {
                            this.cacheService.addOne(cache, event.request, networkResponse.clone());
                            return networkResponse;
                        });
                })
                .catch(error => {
                    console.error("Fetch failed:", error);

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