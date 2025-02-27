import { IStrategy, Strategy, StrategyOptions } from "./strategy";
import { Context } from "@/service-worker/context";

export class StaleWhileRevalidate extends Strategy implements IStrategy {

    constructor(ctx: Context, options: StrategyOptions) {
        super(ctx, options);
    }

    async handle(event: FetchEvent): Promise<Response> {
        return caches.open(this.cacheName).then(async cache => {
            return cache.match(event.request).then(async cachedResponse => {
                const fetchPromise = fetch(event.request.clone())
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
                            this.cacheService.addOne(cache, event.request, networkResponse.clone());
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
                    await this.cacheService.invalidateCache(cache);
                    return cachedResponse;
                }

                return fetchPromise;
            });
        });
    }
}