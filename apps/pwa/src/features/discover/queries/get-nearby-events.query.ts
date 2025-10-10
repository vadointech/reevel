import { QueryBuilderQuery } from "@/lib/react-query";
import { EventPointEntity } from "@/entities/event";
import { getNearbyEvents } from "@/api/event";

export namespace GetNearbyEventsQueryBuilder {
    export type TInput = {
        tileId: string;
        zoom: number;
        filter?: string;
    };
    export type TOutput = EventPointEntity[];
}

export const GetNearbyEventsQueryBuilder: QueryBuilderQuery<GetNearbyEventsQueryBuilder.TInput, GetNearbyEventsQueryBuilder.TOutput> = (
    input,
) => {
    return {
        queryKey: GetNearbyEventsQueryBuilder.queryKey([input.tileId, input.zoom, input.filter]),
        queryFn: () => GetNearbyEventsQueryBuilder.queryFunc(input),
    };
};

GetNearbyEventsQueryBuilder.queryKey = (params = []) => {
    return ["events/nearby/", ...params];
};

GetNearbyEventsQueryBuilder.queryFunc = (input) => {
    return getNearbyEvents({
        params: {
            tileId: input.tileId,
            zoom: input.zoom,
            filter: input.filter,
        },
        fallback: [],
    }).then(response => response.data);
};