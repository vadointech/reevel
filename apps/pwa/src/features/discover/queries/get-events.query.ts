import { eventsWithPaginationFallback, getEvents, GetEvents } from "@/api/discover";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace GetEventsQuery {
    export type TInput = GetEvents.TParams;
    export type TOutput = GetEvents.TOutput;
}

export const GetEventsQuery: QueryBuilderQuery<GetEventsQuery.TInput, GetEventsQuery.TOutput> = (input) => {
    return {
        queryKey: GetEventsQuery.queryKey([input.cityId, input.interestId, input.page, input.limit]),
        queryFn: () => GetEventsQuery.queryFunc(input),
    };
};

GetEventsQuery.queryKey = (params = []) => {
    return ["/events/", ...params.filter(Boolean)];
};

GetEventsQuery.queryFunc = (input) => {
    return getEvents({
        params: input,
        fallback: eventsWithPaginationFallback,
    }).then(response => response.data);
};