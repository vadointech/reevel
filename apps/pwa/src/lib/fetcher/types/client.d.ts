import { FetcherFetchFunc } from "./fetcher";
import { IFetcherRequestConfig } from "./request";

export type FetcherClientFetchOptions<Input, Output, Params extends Record<string, any>> = {
    fetcherFunc: (fetcher: Fetcher, input: Partial<IFetcherRequestConfig<Input, Params>>) => Promise<IFetcherResponse<Output>>;
};

export type FetcherClientCacheOptions<Input, Output, Params extends Record<string, any>> = {
    fetchFunc: FetcherFetchFunc<Input, Output, Params>;
    queryKey: string[];
};

export interface IFetcherClient {
    /**
     * Executes a fetch operation using the specified options.
     *
     * @param {FetcherClientFetchOptions} options - Configuration options for the fetch operation, including input, output, and parameters.
     * @return {FetcherFetchFunc} A function that performs the fetch operation with the given options.
     */
    fetch<Input, Output, Params extends Record<string, any>>
    (options: FetcherClientFetchOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params>;

    /**
     * Caches user-aware data, enabling it to cache results based on the provided parameters and configuration options.
     *
     * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
     * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
     */
    cache<Input, Output, Params extends Record<string, any>>
    (options: FetcherClientCacheOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params>;

    /**
     * aches persistent data, enabling it to cache results based on the provided parameters and configuration options.
     *
     * @param {FetcherClientCacheOptions} options - The configuration options for the caching functionality, such as cache size, expiration, and fetching behavior.
     * @return {FetcherFetchFunc} A fetcher function wrapped with caching logic, allowing retrieval of cached data or fresh data based on the specified options.
     */
    persist<Input, Output, Params extends Record<string, any>>
    (options: FetcherClientCacheOptions<Input, Output, Params>): FetcherFetchFunc<Input, Output, Params>;
}