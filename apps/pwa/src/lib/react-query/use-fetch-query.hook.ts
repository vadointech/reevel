"use client";

import { DefaultError, FetchQueryOptions, QueryKey, useQueryClient } from "@tanstack/react-query";

export function useFetchQuery() {
    const queryClient = useQueryClient();

    async function handleFetchQuery<
        TQueryFnData,
        TError = DefaultError,
        TData = TQueryFnData,
        TQueryKey extends QueryKey = QueryKey,
        TPageParam = never,
    >(
        options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
    ): Promise<TData> {
        console.log(options.queryKey);
        let result = queryClient.getQueryData(options.queryKey) as TData;

        if(!result) {
            result = await queryClient.fetchQuery(options);
        }

        return result;
    }

    return handleFetchQuery;
}