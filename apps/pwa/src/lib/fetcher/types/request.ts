import { FetcherCacheConfig } from "./cache";

export interface FetcherRequest<
    TInput extends FetcherInput = FetcherInput,
    TParams extends FetcherRequestParams = FetcherRequestParams,
> extends Omit<RequestInit, "cache" | "body"> {
    body?: TInput;
    params?: TParams;
    baseURL?: string | undefined;
    cache?: FetcherCacheConfig;
    headers?: Record<string, string>;
    nextHeaders?: Headers;
    method?: FetcherRequestMethod;
}

export type FetcherRequestConfig<
    TInput extends FetcherInput,
    TParams extends FetcherRequestParams,
> =
    TInput extends null ?
        TParams extends null ?
            FetcherRequest<TInput, TParams> :
            RequestConfigWithParams<TParams> :
        TParams extends null ?
            RequestConfigWithBody<TInput> :
            RequestConfigWithBodyAndParams<TInput, TParams>;

export type FetcherRequestParams = Record<string, any> | null;
export type FetcherInput = object | null;

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

interface RequestConfigWithBody<TInput extends FetcherInput> extends FetcherRequest<TInput, null> {
    body: TInput
}

interface RequestConfigWithParams<TParams extends FetcherRequestParams> extends FetcherRequest<null, TParams> {
    params: TParams;
}

interface RequestConfigWithBodyAndParams<
    TInput extends FetcherInput,
    TParams extends FetcherRequestParams,
> extends FetcherRequest<TInput, TParams> {
    body: TInput;
    params: TParams;
}