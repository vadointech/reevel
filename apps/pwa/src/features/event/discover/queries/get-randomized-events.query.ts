import { MapProviderGL } from "@/components/shared/map/types";
import { EventEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { getRandomizedEvents, GetRandomizedEvents } from "@/api/event";

export namespace GetRandomizedEventsQueryBuilder {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        filter?: string,
        nextHeaders?: Headers
    };
    export type TOutput = EventEntity[];
}

export const GetRandomizedEventsQueryBuilder: QueryBuilderQuery<GetRandomizedEventsQueryBuilder.TInput, GetRandomizedEventsQueryBuilder.TOutput> = (
    input,
) => {
    return {
        queryKey: GetRandomizedEventsQueryBuilder.queryKey([input.regionId]),
        queryFn: () => GetRandomizedEventsQueryBuilder.queryFunc(input),
    };
};

GetRandomizedEventsQueryBuilder.queryFunc = (input) => {
    return getRandomizedEvents({
        nextHeaders: input.nextHeaders,
        body: {
            take: input.filter ? 20 : 10,
            interests: input.filter ? [input.filter] : undefined,
            circle: {
                radius: input.radius,
                center: {
                    longitude: input.center.lng,
                    latitude: input.center.lat,
                },
            },
        },
    }).then(response => response.data || []);
};

GetRandomizedEventsQueryBuilder.queryKey = (params = []) => {
    return [...GetRandomizedEvents.queryKey, ...params];
};