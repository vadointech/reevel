import { CacheService } from "@/service-worker/cache/cache.service";
import { Context } from "@/service-worker/context";

export interface IStrategy {
    handle(event: FetchEvent): Promise<Response>
}

export type StrategyOptions = {
    cacheName: string;
    ttl?: number;
};

export class Strategy {
    protected readonly cacheService: CacheService;

    cacheName: string;
    ttl?: number;
    constructor(
        public ctx: Context,
        options: StrategyOptions,
    ) {
        this.cacheService = new CacheService(ctx, options);

        this.cacheName = options.cacheName;
        this.ttl = options.ttl;
    }
}