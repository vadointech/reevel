import { IFetcherRequestConfig } from "@/lib/fetcher/types/request";
import { IFetcherResponse } from "@/lib/fetcher/types/response";

type Config<
    Input,
    Params extends Record<string, any>,
> = Partial<IFetcherRequestConfig<Input, Params>> & {
    [key: string]: any
};

export type FetcherFunc<
    Input,
    Output,
    Params extends Record<string, any>,
>  = (input?: Config<Input, Params>) => Promise<IFetcherResponse<Output>>;