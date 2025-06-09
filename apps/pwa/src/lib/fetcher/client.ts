import { Fetcher } from "./fetcher";
import { IFetcherRequestConfig, IFetcherResponse } from "./types";
import { FetcherRequest } from "@/lib/fetcher/request";

type FetcherFunc<
    Input,
    Output,
    Params extends Record<string, any>,
>  = (input?: Partial<IFetcherRequestConfig<Input, Params>>) => Promise<IFetcherResponse<Output>>;

type Options<
    Input,
    Output,
    Params extends Record<string, any>,
> = {
    fetcherFunc: (fetcher: Fetcher, input: Partial<IFetcherRequestConfig<Input, Params>>) => Promise<IFetcherResponse<Output>>;
};

export function createFetcherClient(defaultConfig: Partial<IFetcherRequestConfig> = {}) {
    const fetcher = new Fetcher(defaultConfig);

    return function fetcherClient<Input = any, Output = any, Params extends Record<string, any> = object>({ fetcherFunc }: Options<Input, Output, Params>): FetcherFunc<Input, Output, Params> {
        return async(input = new FetcherRequest({})) => {
            return fetcherFunc(fetcher, input);
        };
    };
}