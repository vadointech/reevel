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
    next: NextFetchRequestConfig | undefined;
    cache: RequestCache | undefined
    signal: AbortSignal | null | undefined
}