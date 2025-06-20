import { IFetcherRequestConfig, FetcherRequestMethod } from "./types";
import { init } from "@/lib/init";

export class FetcherRequest<Input = any, Params extends Record<string, any> = object> implements IFetcherRequestConfig<Input, Params> {
    url: string | undefined = undefined;
    method: FetcherRequestMethod | string | undefined = undefined;
    baseURL: string | undefined = undefined;
    headers: Record<string, string> | undefined = undefined;
    nextHeaders: Headers | undefined = undefined;
    body: Input | undefined = undefined;
    params: Params | undefined = undefined;
    credentials: RequestCredentials | undefined = undefined;
    cache: RequestCache | undefined = undefined;
    userAwareCacheKey: string | undefined = undefined;
    cacheTags: string[] | undefined = undefined;
    cacheRevalidate: number | undefined = undefined;
    signal: AbortSignal | undefined | null = undefined;

    constructor(params: Partial<IFetcherRequestConfig<Input, Params>> = {}) {
        init(this, params);
    }
}