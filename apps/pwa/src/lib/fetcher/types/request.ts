import { FetcherCacheConfig } from "./cache";


export type FetcherRequestParams = Record<string, string | number | boolean> | null;
export type FetcherInput =
  string | string[] |
  number | number[] |
  object | object[] |
  boolean | boolean[] |
  null;
export type FetcherOutput = FetcherInput;

export interface FetcherRequest<TInput = any, TParams = any, TOutput = any> extends Omit<RequestInit, "cache" | "body"> {
    body?: TInput;
    params?: TParams;
    fallback?: TOutput;
    baseURL?: string | undefined;
    cache?: FetcherCacheConfig;
    headers?: Record<string, string>;
    nextHeaders?: Headers;
    method?: FetcherRequestMethod;
}

export interface FetcherRequestWithFallback<TInput, TParams, TOutput> extends FetcherRequest<TInput, TParams, TOutput> {
    fallback: TOutput;
}

export type FetcherRequestConfig<TInput, TParams, TOutput> =
    TInput extends null ?
        TParams extends null ?
            FetcherRequest<TInput, TParams, TOutput> :
            RequestConfigWithParams<FetcherRequest<TInput, TParams, TOutput>, TParams> :
        TParams extends null ?
            RequestConfigWithBody<FetcherRequest<TInput, TParams, TOutput>, TInput> :
            RequestConfigWithBodyAndParams<FetcherRequest<TInput, TParams, TOutput>, TInput, TParams>;


export type FetcherRequestConfigWithFallback<TInput, TParams, TOutput> =
  TInput extends null ?
      TParams extends null ?
          FetcherRequestWithFallback<TInput, TParams, TOutput> :
          RequestConfigWithParams<FetcherRequestWithFallback<TInput, TParams, TOutput>, TParams> :
      TParams extends null ?
          RequestConfigWithBody<FetcherRequestWithFallback<TInput, TParams, TOutput>, TInput> :
          RequestConfigWithBodyAndParams<FetcherRequestWithFallback<TInput, TParams, TOutput>, TInput, TParams>;


type RequestConfigWithBody<TRequest extends FetcherRequest, TInput> = TRequest & {
    body: TInput
};

type RequestConfigWithParams<TRequest extends FetcherRequest, TParams> = TRequest & {
    params: TParams;
};

type RequestConfigWithBodyAndParams<TRequest extends FetcherRequest, TInput, TParams> = TRequest & {
    body: TInput;
    params: TParams;
};

type FetcherRequestMethod = "GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "PATCH" | "PURGE" | "LINK" | "UNLINK";