import { CacheStrategies } from "./strategies";
import { CacheService } from "./cache.service";
import { createContext } from "./context";

export declare const VERSION: string;

const ctx = createContext({
    swVersion: VERSION,
    cacheEnabled: true,
});

export const cacheService = new CacheService(ctx);
export const cacheStrategies = new CacheStrategies(ctx, cacheService);

export { Caches } from "./caches.config";
export { matcher } from "./matcher";