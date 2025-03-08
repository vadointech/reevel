import { Fetcher } from "./fetcher";
import { FetcherRequestConfig, FetcherResponse } from "./types";

type FetcherFunc<
    Input,
    Output,
    Params extends Record<string, any>,
>  = (input?: FetcherRequestConfig<Input, Params>) => Promise<FetcherResponse<Output>>;

type Options<
    Input,
    Output,
    Params extends Record<string, any>,
> = {
    fetcherFunc: (fetcher: Fetcher, input?: FetcherRequestConfig<Input, Params>) => Promise<FetcherResponse<Output>>;
};

export function createFetcherClient(defaultConfig: FetcherRequestConfig = {}) {
    const fetcher = new Fetcher(defaultConfig);

    return function fetcherClient<Input = any, Output = any, Params extends Record<string, any> = object>({ fetcherFunc }: Options<Input, Output, Params>): FetcherFunc<Input, Output, Params> {
        return async(input) => {
            return fetcherFunc(fetcher, input);
        };
    };
}