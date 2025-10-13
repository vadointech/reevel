import { QueryBuilderQuery } from "@/lib/react-query";
import { eventsWithPaginationFallback, getHighlights, GetHighlights } from "@/api/discover";

export namespace GetHighlightsQuery {
    export type TInput = GetHighlights.TParams;
    export type TOutput = GetHighlights.TOutput;
}

export const GetHighlightsQuery: QueryBuilderQuery<GetHighlightsQuery.TInput, GetHighlightsQuery.TOutput> = (input) => {
    return {
        queryKey: GetHighlightsQuery.queryKey([input.cityId, input.page, input.limit]),
        queryFn: () => GetHighlightsQuery.queryFunc(input),
    };
};

GetHighlightsQuery.queryKey = (params = []) => {
    return ["events/collections/highlights/", ...params.filter(Boolean)];
};

GetHighlightsQuery.queryFunc = (input) => {
    return getHighlights({
        params: input,
        fallback: eventsWithPaginationFallback,
    }).then(response => response.data);
};