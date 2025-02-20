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

export type FetcherRequestConfig<Output = any, Params = any> = {
    url?: string;
    method?: Method | string;
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Params;
    data?: Output | null;
    credentials?: RequestCredentials
    next?: NextFetchRequestConfig;
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
    get<Output = any, Params = any>(url: string, config?: FetcherRequestConfig<Output, Params>): Promise<FetcherResponse<Output>>
    post<Input = any, Output = any, Params = any>(url: string, data: Input, config?: FetcherRequestConfig<Output, Params>): Promise<FetcherResponse<Output>>
}