import { EventEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { GetRandomizedEvents, getRandomizedEvents } from "@/api/discover";

export namespace GetRandomizedEventsQuery {
    export type TInput = GetRandomizedEvents.TParams;
    export type TOutput = EventEntity[];
}

export const GetRandomizedEventsQuery: QueryBuilderQuery<GetRandomizedEventsQuery.TInput, GetRandomizedEventsQuery.TOutput> = (
    input,
) => {
    return {
        queryKey: GetRandomizedEventsQuery.queryKey([input.cityId, input.interestId, input.limit, input.page]),
        queryFn: () => GetRandomizedEventsQuery.queryFunc(input),
    };
};

GetRandomizedEventsQuery.queryKey = (params = []) => {
    return ["events/randomized/", ...params.filter(Boolean)];
};

GetRandomizedEventsQuery.queryFunc = (input) => {
    return getRandomizedEvents({
        params: input,
        fallback: [],
    }).then(response => response.data);
};