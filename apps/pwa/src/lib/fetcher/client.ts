import { unstable_cache } from "next/cache";

import { Fetcher } from "./fetcher";
import { FetcherCacheManager } from "./cache";

import {
    FetcherClientCacheOptions,
    FetcherClientFetchOptions,
    FetcherFetchFunc, FetcherInput,
    FetcherRequest,
    FetcherRequestConfig,
    FetcherRequestParams,
    IFetcher,
    IFetcherCacheManager,
    IFetcherClient,
} from "./types";

export class FetcherClient implements IFetcherClient {
    private readonly fetcher: IFetcher;
    private readonly cacheManager: IFetcherCacheManager;

    constructor(defaultConfig: Partial<FetcherRequest>) {
        this.fetcher = new Fetcher(defaultConfig);
        this.cacheManager = new FetcherCacheManager(defaultConfig.cache);
    }

    fetch<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>({ fetcherFunc }: FetcherClientFetchOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams>) => {
            return fetcherFunc(this.fetcher, input);
        };

        return executor as FetcherFetchFunc<TInput, TOutput, TParams>;
    }

    cache<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>({ fetchFunc, ...options }: FetcherClientCacheOptions<TInput, TOutput, TParams>):  FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams>) => {
            const cacheKeys = this.cacheManager.newRequestCacheKey(input, options.queryKey);

            const tags = [...cacheKeys];
            let revalidate: number | undefined = undefined;

            if(input.cache?.tags) tags.push(...input.cache.tags);
            else if(options.cache?.tags) tags.push(...options.cache.tags);

            if(input.cache?.revalidate) revalidate = input.cache.revalidate;
            else if(options.cache?.revalidate) revalidate = options.cache.revalidate;

            return unstable_cache(
                () => fetchFunc(input),
                cacheKeys, { tags, revalidate },
            )();
        };

        return executor as FetcherFetchFunc<TInput, TOutput, TParams>;
    }

    persist<TInput extends FetcherInput = null, TOutput = any, TParams extends FetcherRequestParams = null>({ fetchFunc, ...options }: FetcherClientCacheOptions<TInput, TOutput, TParams>):  FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams>) => {
            return unstable_cache(
                () => fetchFunc(input),
                options.queryKey, {
                    tags: options.queryKey,
                    revalidate: input.cache?.revalidate,
                },
            )();
        };

        return executor as FetcherFetchFunc<TInput, TOutput, TParams>;
    }
}