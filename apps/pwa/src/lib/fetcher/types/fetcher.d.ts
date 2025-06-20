import { IFetcherResponse } from "./response";
import { IFetcherRequestConfig } from "./request";

export type FetcherInitDefaults = Omit<
    Partial<IFetcherRequestConfig>,
    "url" |
    "method" |
    "data"
>;

export interface IFetcher {
    get<Input extends null = null, Output = any, Params extends Record<string, any> = object>(url: string, config?: IFetcherRequestConfig<Input, Params>): Promise<IFetcherResponse<Output>>
    post<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config?: IFetcherRequestConfig<Input, Params>): Promise<IFetcherResponse<Output>>
    patch<Input = any, Output = any, Params extends Record<string, any> = object>(url: string, config?: IFetcherRequestConfig<Input, Params>): Promise<IFetcherResponse<Output>>
    delete<Input extends null = null, Output = any, Params extends Record<string, any> = object>(url: string, config?: IFetcherRequestConfig<Input, Params>): Promise<IFetcherResponse<Output>>
}

export interface FetcherFetchFunc<Input, Output, Params extends Record<string, any>> {
    (input?: Partial<IFetcherRequestConfig<Input, Params>>): Promise<IFetcherResponse<Output>>
}