import { QueryFilters, useQueryClient } from "@tanstack/react-query";

export function useQueriesData<TQueryFnData = unknown, TQueryFilters extends QueryFilters<any, any, any, any> = QueryFilters<TQueryFnData>, TInferredQueryFnData = TQueryFilters extends QueryFilters<infer TData, any, any, any> ? TData : TQueryFnData>(
    filters: TQueryFilters,
) {
    const queryClient = useQueryClient();
    return () => {
        const cachedData = queryClient.getQueriesData<TQueryFnData, TQueryFilters, TInferredQueryFnData>(filters);
        return cachedData.flatMap(([, data]) => data);
    };
}