import { FetcherRequest } from "./request";

export interface IFetcherCacheManager {
    /**
   * Generates a new cache key for a given request and query key array.
   *
   * @param {Partial<FetcherRequest>} request - The request configuration object, partially provided.
   * @param {string[]} queryKey - An array of strings used to form the query-specific key.
   * @return {string[]} An array of unique cache keys based on the request and query key.
   */
    newRequestCacheKey(request: Partial<FetcherRequest>, queryKey: string[]): string[]
}

export type FetcherCacheConfig = {
    tags?: string[];
    revalidate?: number;
    mode?: RequestCache;
    userAwareKey?: string; // cookie token for user-aware caching
};