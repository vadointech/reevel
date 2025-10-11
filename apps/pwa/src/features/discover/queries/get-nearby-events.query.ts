import { QueryBuilderQuery } from "@/lib/react-query";
import { EventPointEntity } from "@/entities/event";
import { getNearbyEvents } from "@/api/discover";

export namespace GetNearbyEventsQuery {
    export type TInput = {
        tileId: string;
        zoom: number;
        filter?: string;
    };
    export type TOutput = EventPointEntity[];
}

export const GetNearbyEventsQuery: QueryBuilderQuery<GetNearbyEventsQuery.TInput, GetNearbyEventsQuery.TOutput> = (
    input,
) => {
    return {
        queryKey: GetNearbyEventsQuery.queryKey([input.tileId, input.zoom, input.filter]),
        queryFn: () => GetNearbyEventsQuery.queryFunc(input),
    };
};

GetNearbyEventsQuery.queryKey = (params = []) => {
    return ["events/nearby/", ...params];
};

GetNearbyEventsQuery.queryFunc = (input) => {
    return getNearbyEvents({
        params: {
            tileId: input.tileId,
            zoom: input.zoom,
            filter: input.filter,
        },
        fallback: [],
    }).then(response => response.data);
};