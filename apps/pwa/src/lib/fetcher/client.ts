import { Fetcher } from "./fetcher";
import { FetcherRequestConfig, FetcherResponse } from "./types";
import { createServerFetcher } from "./api/server";
import { createClientFetcher } from "./api/client";

type InputConfig<Input, Params> = {
    body?: Input;
    params?: Params;
};

type FetcherFunc<
    Input,
    Output,
    Params,
>  = (input?: InputConfig<Input, Params>) => Promise<FetcherResponse<Output>>;

type Cache = {
    revalidateTag: (tag: string) => void;
    revalidatePath: (path: string) => void;
};

type Options<Input, Output, Params> = {
    fetcherFunc: (fetcher: Fetcher, input?: InputConfig<Input, Params>) => Promise<FetcherResponse<Output>>;
    onSuccess?: (cache: Cache) => void;
};

export function createFetcherClient(defaultConfig: FetcherRequestConfig = {}) {
    const fetcher = createClientFetcher(defaultConfig);
    return function fetcherClient<Input = any, Output = any, Params extends Record<string, any> = object>({ fetcherFunc, onSuccess }: Options<Input, Output, Params>): FetcherFunc<Input, Output, Params> {
        if (typeof window === "undefined") {
            return async(input) => {
                const { headers } = await import("next/headers");
                const res = await fetcherFunc(createServerFetcher(await headers(), defaultConfig), input);
                if(onSuccess) {
                    onSuccess(await import("next/cache"));
                }
                return res;
            };
        }

        return async(input) => {
            return fetcherFunc(fetcher, input);
        };
    };
}