import { unstable_cache } from "next/cache";
import { Fetcher } from "./fetcher";
import { FetcherRequest } from "./request";
import { FetcherCacheManager } from "./cache";

import {
    FetcherClientCacheOptions,
    FetcherClientFetchOptions,
    FetcherFetchFunc,
    IFetcherClient,
} from "./types";

export class FetcherClient implements IFetcherClient {
    private readonly _fetcher: Fetcher;
    private readonly _cacheManager: FetcherCacheManager;

    constructor(defaultConfig: Partial<FetcherRequest> = {}) {
        this._fetcher = new Fetcher(defaultConfig);
        this._cacheManager = new FetcherCacheManager(this._fetcher);
    }

    fetch<Input = any, Output = any, Params extends Record<string, any> = object>({ fetcherFunc }: FetcherClientFetchOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params> {
        return (input = new FetcherRequest({})) => {
            return fetcherFunc(this._fetcher, input);
        };
    }

    cache<Input = any, Output = any, Params extends Record<string, any> = object>(options: FetcherClientCacheOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params> {
        return (input = new FetcherRequest({})) => {
            const cacheKeys = this._cacheManager.newRequestCacheKey(input, options.queryKey);

            return unstable_cache(
                () => options.fetchFunc(input),
                cacheKeys, {
                    tags: cacheKeys,
                    revalidate: input.cacheRevalidate,
                },
            )();
        };
    }

    persist<Input = any, Output = any, Params extends Record<string, any> = object>(options: FetcherClientCacheOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params> {
        return (input = new FetcherRequest({})) => {
            return unstable_cache(
                () => options.fetchFunc(input),
                options.queryKey, {
                    tags: options.queryKey,
                    revalidate: input.cacheRevalidate,
                },
            )();
        };
    }
}