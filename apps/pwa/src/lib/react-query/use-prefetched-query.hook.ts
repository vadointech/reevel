import { QueryFilters, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export function usePrefetchedQuery<TQueryFnData = unknown, TQueryFilters extends QueryFilters<any, any, any, any> = QueryFilters<TQueryFnData>, TInferredQueryFnData = TQueryFilters extends QueryFilters<infer TData, any, any, any> ? TData : TQueryFnData>(
    filters: TQueryFilters & {
        onSuccess?: (
            data: Array<TInferredQueryFnData | undefined>,
            cache: [readonly unknown[], TInferredQueryFnData | undefined][]
        ) => void;
    },
) {
    const queryClient = useQueryClient();

    const prefetchedData = useMemo(() => {
        const cache = queryClient.getQueriesData<TQueryFnData, TQueryFilters, TInferredQueryFnData>(filters);
        const flatMap = cache.flatMap(([, data]) => data);
        return [flatMap, cache] as const;
    }, []);
    useEffect(() => filters.onSuccess?.(...prefetchedData), [prefetchedData]);

    return prefetchedData;
}