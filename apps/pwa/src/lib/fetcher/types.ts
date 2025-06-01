export type Method =
  | "get" | "GET"
  | "delete" | "DELETE"
  | "head" | "HEAD"
  | "options" | "OPTIONS"
  | "post" | "POST"
  | "put" | "PUT"
  | "patch" | "PATCH"
  | "purge" | "PURGE"
  | "link" | "LINK"
  | "unlink" | "UNLINK";

export type FetcherRequestConfig<Input = any, Params extends Record<string, any> = object> = {
    url?: string;
    method?: Method | string;
    baseURL?: string;
    headers?: Record<string, string>;
    nextHeaders?: Headers;
    body?: Input;
    params?: Params;
    credentials?: RequestCredentials
    next?: NextFetchRequestConfig;
    cache?: RequestCache
    signal?: AbortSignal | null
};

export type FetcherResponse<Output = any> = {
    data: Output | null;
    url: string;
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    type: ResponseType;
    redirected: boolean;
};

export type FetcherInitDefaults = Omit<
    FetcherRequestConfig,
    "url" |
    "method" |
    "data"
>;

export interface IFetcher {
    get<Input extends null = null, Output = any, Params extends Record<string, any> = object>(url: string, config?: FetcherRequestConfig<Input, Params>): Promise<FetcherResponse<Output>>
    post<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config?: FetcherRequestConfig<Input, Params>): Promise<FetcherResponse<Output>>
    patch<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config?: FetcherRequestConfig<Input, Params>): Promise<FetcherResponse<Output>>
}