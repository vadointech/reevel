import { ctx } from "../context";
import { IStrategy } from "../types";
import { CacheParams, CacheService } from "../cache.service";

export class NetworkFirst implements IStrategy {

    constructor(
        private readonly cacheService: CacheService,
    ) {}

    async apply(
        event: FetchEvent,
        params: CacheParams,
    ): Promise<Response> {
        const networkTimeoutMs = params.networkTimeout || ctx.networkTimeout;
        
        // Start with the network request
        let timeoutId: number | undefined;
        const networkPromise = this.getFromNetwork(event.request.clone(), params);

        // Set up timeout if specified
        if (networkTimeoutMs) {
            const timeoutPromise = new Promise<Response>((resolve) => {
                timeoutId = self.setTimeout(() => {
                    this.getFromCache(event.request, params).then(resolve);
                }, networkTimeoutMs);
            });

            try {
                // Race network against timeout
                return await Promise.race([networkPromise, timeoutPromise]);
            } catch {
                // console.log(`Network request failed, falling back to cache for: ${event.request.url}`);
                return this.getFromCache(event.request, params);
            } finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        } else {
            // No timeout, try network with cache fallback
            try {
                return await networkPromise;
            } catch {
                // console.log(`Network request failed, falling back to cache for: ${event.request.url}`);
                return this.getFromCache(event.request, params);
            }
        }
    }

    private async getFromNetwork(request: Request, params: CacheParams): Promise<Response> {
        const response = await fetch(request);
        const responseClone = response.clone();

        // Check if we should cache this response
        if (response && response.status === 200) {
            // Cache the response asynchronously
            caches.open(params.cacheName)
                .then(cache => {
                    this.cacheService.addOne(cache, request, responseClone, params);
                })
                .catch(() => {
                    // console.error(`Failed to cache response for: ${request.url}`, error);
                });
        }

        return response;
    }

    private async getFromCache(request: Request, params: CacheParams): Promise<Response> {
        const cache = await caches.open(params.cacheName);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            await this.cacheService.invalidateCache(cache, params);
            return cachedResponse;
        }

        // If nothing in cache, throw an error to be consistent with network failures
        throw new Error(`No cached response found for: ${request.url}`);
    }
}