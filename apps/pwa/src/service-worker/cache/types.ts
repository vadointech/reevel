import { CacheStrategy } from "./cache.strategies";
import { CacheParams } from "./cache.service";
import { Caches } from "./cache.config";

export interface IStrategy {
    apply(event: FetchEvent, params: CacheParams): Promise<Response>
}

export type CacheConfig = Array<{
    cache: Caches,
    validator: RegExp,
    strategy: CacheStrategy,
    params: Partial<CacheParams>
}>;