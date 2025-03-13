import { CacheService } from "./cache.service";
import { StaleWhileRevalidate } from "./strategies/stale-while-revalidate.strategy";
import { NetworkFirst } from "./strategies/network-first.strategy";
import { CacheFirst } from "./strategies/cache-first.strategy";

import cacheService from "./cache.service";

export class CacheStrategies {
    staleWhileRevalidate: StaleWhileRevalidate;
    networkFirst: NetworkFirst;
    cacheFirst: CacheFirst;

    constructor(
        cacheService: CacheService,
    ) {
        this.staleWhileRevalidate = new StaleWhileRevalidate(cacheService);
        this.networkFirst = new NetworkFirst(cacheService);
        this.cacheFirst = new CacheFirst(cacheService);
    }
}

export type CacheStrategy = keyof CacheStrategies;

export default new CacheStrategies(cacheService);