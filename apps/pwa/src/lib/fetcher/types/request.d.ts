import { FetcherRequestMethod } from "./method";

export interface IFetcherRequestConfig<Input = any, Params extends Record<string, any> = object> {
    url: string | undefined;
    method: FetcherRequestMethod | string | undefined;
    baseURL: string | undefined;
    headers: Record<string, string> | undefined;
    nextHeaders: Headers | undefined;
    body: Input | undefined;
    params: Params | undefined;
    credentials: RequestCredentials | undefined;
    cache: RequestCache | undefined;
    userAwareCacheKey: string | undefined; // cookie token for user-aware caching
    cacheTags: string[] | undefined;
    cacheRevalidate: number | undefined;
    signal: AbortSignal | null | undefined
}