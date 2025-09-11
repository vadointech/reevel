import { FetcherCacheConfig } from "./cache";

export type FetcherRequestParams = Record<string, any> | null;
export type FetcherInput = object | null;
export type FetcherOutput = any | any[] | null;

export interface FetcherRequest<
    TInput extends FetcherInput = FetcherInput,
    TParams extends FetcherRequestParams = FetcherRequestParams,
    TOutput extends FetcherOutput = FetcherOutput,
> extends Omit<RequestInit, "cache" | "body"> {
    body?: TInput;
    params?: TParams;
    fallback?: TOutput;
    baseURL?: string | undefined;
    cache?: FetcherCacheConfig;
    headers?: Record<string, string>;
    nextHeaders?: Headers;
    method?: FetcherRequestMethod;
}

export interface FetcherRequestWithFallback<
    TInput extends FetcherInput,
    TParams extends FetcherRequestParams,
    TOutput extends FetcherOutput,
> extends FetcherRequest<TInput, TParams> {
    fallback: TOutput;
}

export type FetcherRequestConfig<
    TInput extends FetcherInput,
    TParams extends FetcherRequestParams,
> =
    TInput extends null ?
        TParams extends null ?
            FetcherRequest<TInput, TParams> :
            RequestConfigWithParams<FetcherRequest<TInput, TParams>, TParams> :
        TParams extends null ?
            RequestConfigWithBody<FetcherRequest<TInput, TParams>, TInput> :
            RequestConfigWithBodyAndParams<FetcherRequest<TInput, TParams>, TInput, TParams>;


export type FetcherRequestConfigWithFallback<
    TInput extends FetcherInput,
    TParams extends FetcherRequestParams,
    TOutput extends FetcherOutput,
> =
  TInput extends null ?
      TParams extends null ?
          FetcherRequestWithFallback<TInput, TParams, TOutput> :
          RequestConfigWithParams<FetcherRequestWithFallback<TInput, TParams, TOutput>, TParams> :
      TParams extends null ?
          RequestConfigWithBody<FetcherRequestWithFallback<TInput, TParams, TOutput>, TInput> :
          RequestConfigWithBodyAndParams<FetcherRequestWithFallback<TInput, TParams, TOutput>, TInput, TParams>;

type FetcherRequestMethod =
  "GET" |
  "DELETE" |
  "HEAD" |
  "OPTIONS" |
  "POST" |
  "PUT" |
  "PATCH" |
  "PURGE" |
  "LINK" |
  "UNLINK";

type RequestConfigWithBody<TRequest extends FetcherRequest, TInput extends FetcherInput> = TRequest & {
    body: TInput
};

type RequestConfigWithParams<TRequest extends FetcherRequest, TParams extends FetcherRequestParams> = TRequest & {
    params: TParams;
};

type RequestConfigWithBodyAndParams<TRequest extends FetcherRequest, TInput extends FetcherInput, TParams> = TRequest & {
    body: TInput;
    params: TParams;
};