import { FetcherRequestConfig } from "./request";
import { FetcherResponse } from "./response";

export interface IFetcher {
    get<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (url: string, config?: Partial<FetcherRequestConfig<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    post<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (url: string, config?: Partial<FetcherRequestConfig<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    patch<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (url: string, config?: Partial<FetcherRequestConfig<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
    delete<TInput extends object | null = null, TOutput = any, TParams extends Record<string, any> | null = null>
    (url: string, config?: Partial<FetcherRequestConfig<TInput, TParams>>): Promise<FetcherResponse<TOutput>>
}