import { FetcherRequestConfig, FetcherResponse } from "@/lib/fetcher/types";

export type ActionResponse<TOutput> = {
    response?: FetcherResponse<TOutput>,
    data?: Maybe<TOutput>,
    error?: unknown
};

export type ActionConfig<
    TParams extends Record<string, unknown> = Record<string, unknown>,
> = TypedOmit<FetcherRequestConfig, "url" | "method" | "params"> & { params?: TParams };

export const action = <
    Input,
    Output,
    TParams extends Record<string, unknown> = Record<string, unknown>,
>(options: {
    fallback?: Maybe<Output>;
    fetchFn: (args: { input: Input; config?: ActionConfig<TParams> }) => Promise<FetcherResponse<Output>>;
}) => {
    return async(
        input: Input,
        config?: ActionConfig<TParams> & {
            fallback?: Maybe<Output>
        },
    ): Promise<ActionResponse<Output>> => {
        try {
            const res = await options.fetchFn({
                input,
                config,
            });


            return { data: res.data, error: undefined, response: res };
        } catch (error) {
            // Config fallback is prior over options fallback
            return { data: config?.fallback ?? options.fallback ?? null, error, response: undefined };
        }
    };
};
