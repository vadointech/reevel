import { unstable_cache } from "next/cache";

import { Fetcher } from "./fetcher";
import { FetcherCacheManager } from "./cache";

import {
    FetcherClientCacheOptions,
    FetcherClientFetchOptions,
    FetcherFetchFunc, FetcherInput, FetcherOutput,
    FetcherRequest,
    FetcherRequestConfig,
    FetcherRequestParams,
    IFetcherCacheManager,
    IFetcherClient,
} from "./types";
import { FetcherInterceptor } from "@/lib/fetcher/interceptor";

export class FetcherClient extends Fetcher implements IFetcherClient {
    private readonly cacheManager: IFetcherCacheManager;

    readonly interceptor: FetcherInterceptor;

    constructor(defaultConfig: Partial<FetcherRequest> = {}) {
        const interceptors = new FetcherInterceptor();
        super(defaultConfig, interceptors);
        this.interceptor = interceptors;
        this.cacheManager = new FetcherCacheManager(defaultConfig.cache);
    }

    fetch<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>({ fetcherFunc }: FetcherClientFetchOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams, TOutput>) => {
            return fetcherFunc(this, input);
        };

        return executor as FetcherFetchFunc<TInput, TOutput, TParams>;
    }

    cache<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>({ fetchFunc, ...options }: FetcherClientCacheOptions<TInput, TOutput, TParams>):  FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams, TOutput>) => {
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

    persist<TInput extends FetcherInput = null, TOutput extends FetcherOutput = null, TParams extends FetcherRequestParams = null>({ fetchFunc, ...options }: FetcherClientCacheOptions<TInput, TOutput, TParams>):  FetcherFetchFunc<TInput, TOutput, TParams> {
        const executor = (input: FetcherRequestConfig<TInput, TParams, TOutput>) => {
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