import {
    FetcherInput, FetcherOutput,
    FetcherRequestConfig,
    FetcherRequestConfigWithFallback,
    FetcherRequestParams,
} from "./request";
import { FetcherResponse, FetcherSafeResponse } from "./response";
import { IFetcher } from "./fetcher";
import { FetcherCacheConfig } from "./cache";

export interface IFetcherClient {
    /**
   * Executes a fetch operation using the specified options.
   *
   * @param {FetcherClientFetchOptions} options - Configuration options for the fetch operation, including input, output, and parameters.
   * @return {FetcherFetchFunc} A function that performs the fetch operation with the given options.
   */
    fetch<TInput extends FetcherInput, TOutput, TParams extends FetcherRequestParams>
    (options: FetcherClientFetchOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>

    /**
   * Caches user-aware data, enabling it to cache results based on the provided parameters and configuration options.
   *
   * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
   * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
   */
    cache<TInput extends FetcherInput, TOutput, TParams extends FetcherRequestParams>
    (options: FetcherClientCacheOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>;

    /**
   * aches persistent data, enabling it to cache results based on the provided parameters and configuration options.
   *
   * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
   * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
   */
    persist<TInput extends FetcherInput, TOutput, TParams extends FetcherRequestParams>
    (options: FetcherClientCacheOptions<TInput, TOutput, TParams>): FetcherFetchFunc<TInput, TOutput, TParams>;
}

export type FetcherClientCacheOptions<
    TInput extends FetcherInput,
    TOutput,
    TParams extends FetcherRequestParams,
> = {
    fetchFunc: FetcherFetchFunc<TInput, TOutput, TParams>;
    queryKey: string[];
    cache?: FetcherCacheConfig;
};


export type FetcherClientFetchOptions<
    TInput extends FetcherInput,
    TOutput extends FetcherOutput,
    TParams extends FetcherRequestParams,
> = {
    fetcherFunc: (fetcher: IFetcher, input: FetcherRequestConfig<TInput, TParams, TOutput>) => Promise<FetcherResponse<TOutput>>;
};

export interface FetcherFetchFunc<TInput extends FetcherInput, TOutput extends FetcherOutput, TParams extends FetcherRequestParams> {
    (input: FetcherRequestConfigWithFallback<TInput, TParams, TOutput>): Promise<FetcherSafeResponse<TOutput>>;
    (input: FetcherRequestConfig<TInput, TParams, TOutput>): Promise<FetcherResponse<TOutput>>;
}