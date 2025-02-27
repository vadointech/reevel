import { CacheService } from "../cache.service";
import { Context } from "@/service-worker/cache/context";
import { StaleWhileRevalidate } from "./stale-while-revalidate.strategy";
import { CacheFirst } from "./cache-first.strategy";

export class CacheStrategies {

    staleWhileRevalidate: StaleWhileRevalidate;
    cacheFirst: CacheFirst;

    constructor(
        ctx: Context,
        cacheService: CacheService,
    ) {
        this.staleWhileRevalidate = new StaleWhileRevalidate(ctx, cacheService);
        this.cacheFirst = new CacheFirst(ctx, cacheService);
    }
}