import { FetcherCacheConfig } from "./cache";

export interface FetcherRequest extends Omit<RequestInit, "cache" | "body"> {
    baseURL?: string | undefined;
    cache?: FetcherCacheConfig;
    headers?: Record<string, string>;
    nextHeaders?: Headers;
    method?: FetcherRequestMethod;
}

export type FetcherRequestConfig<
    TInput extends object | null = null,
    TParams extends FetcherRequestParams | null = null,
> = RequestConfigWithBodyAndParams<TInput, TParams>;
// TInput extends null ?
//     TParams extends null ?
//         RequestConfigWithParams<TParams> :
//     TParams extends null ?
//         RequestConfigWithInput<TInput> :
//         RequestConfigWithInputAndParams<TInput, TParams>;

export type FetcherRequestParams = Record<string, any>;

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

interface RequestConfigWithBody<TInput> extends FetcherRequest {
    body: TInput
}

interface RequestConfigWithParams<TParams> extends FetcherRequest {
    params: TParams;
}

interface RequestConfigWithBodyAndParams<TInput, TParams> extends FetcherRequest {
    body?: TInput;
    params?: TParams;
}