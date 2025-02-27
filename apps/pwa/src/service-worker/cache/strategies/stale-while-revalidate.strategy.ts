import { Context } from "../context";
import { CacheParams, CacheService } from "../cache.service";

export class StaleWhileRevalidate {

    constructor(
        private ctx: Context,
        private readonly cacheService: CacheService,
    ) {}

    async apply(event: FetchEvent, params: CacheParams): Promise<Response> {
        return caches.open(params.cacheName).then(async cache => {
            return cache.match(event.request).then(async cachedResponse => {
                const fetchPromise = fetch(event.request.clone())
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
                            this.cacheService.addOne(cache, event.request, networkResponse.clone(), params);
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error("Fetch failed:", error);

                        return cachedResponse || new Response("Network request failed", {
                            status: 503,
                            statusText: "Service Unavailable",
                        });
                    });

                if (cachedResponse) {
                    await this.cacheService.invalidateCache(cache, params);
                    return cachedResponse;
                }

                return fetchPromise;
            });
        });
    }
}