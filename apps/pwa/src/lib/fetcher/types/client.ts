import { FetcherRequestConfig } from "./request";
import { FetcherResponse } from "./response";
import { IFetcher } from "./fetcher";
import { FetcherCacheConfig } from "./cache";

export interface IFetcherClient {
    /**
   * Executes a fetch operation using the specified options.
   *
   * @param {FetcherClientFetchOptions} options - Configuration options for the fetch operation, including input, output, and parameters.
   * @return {FetcherFetchFunc} A function that performs the fetch operation with the given options.
   */
    fetch<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (options: FetcherClientFetchOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>

    /**
   * Caches user-aware data, enabling it to cache results based on the provided parameters and configuration options.
   *
   * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
   * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
   */
    cache<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (options: FetcherClientCacheOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>;

    /**
   * aches persistent data, enabling it to cache results based on the provided parameters and configuration options.
   *
   * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
   * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
   */
    persist<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (options: FetcherClientCacheOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>;
}

export type FetcherClientCacheOptions<
    TInput extends object | null = null,
    TOutput = any,
    TParams extends Record<string, any> | null = null,
> = {
    fetchFunc: FetcherFetchFunc<TInput, TOutput, TParams>;
    queryKey: string[];
    cache?: FetcherCacheConfig;
};


export type FetcherClientFetchOptions<
    TInput extends object | null = null,
    TOutput = any,
    TParams extends Record<string, any> | null = null,
> = {
    fetcherFunc: (fetcher: IFetcher, input: FetcherRequestConfig<TInput, TParams>) => Promise<FetcherResponse<TOutput>>;
};

export type FetcherFetchFunc<
    TInput extends object | null = null,
    TOutput = any,
    TParams extends Record<string, any> | null = null,
> = (input: FetcherRequestConfig<TInput, TParams>) => Promise<FetcherResponse<TOutput>>;