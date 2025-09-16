import { QueryBuilderQuery } from "@/lib/react-query";
import { MapProviderGL } from "@/components/shared/map/types";
import { EventEntity } from "@/entities/event";
import { GetNearbyEvents } from "@/api/event";
import { getNearbyEvents } from "@/api/event/server";

export namespace GetNearbyEventsQueryBuilder {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        filter?: string,
    };
    export type TOutput = EventEntity[];
}

export const GetNearbyEventsQueryBuilder: QueryBuilderQuery<GetNearbyEventsQueryBuilder.TInput, GetNearbyEventsQueryBuilder.TOutput> = (
    input,
) => {
    return {
        queryKey: GetNearbyEventsQueryBuilder.queryKey([input.regionId]),
        queryFn: () => GetNearbyEventsQueryBuilder.queryFunc(input),
    };
};

GetNearbyEventsQueryBuilder.queryKey = (params = []) => {
    return [...GetNearbyEvents.queryKey, ...params];
};

GetNearbyEventsQueryBuilder.queryFunc = (input) => {
    return getNearbyEvents({
        take: input.filter ? 20 : 10,
        interests: input.filter ? [input.filter] : undefined,
        circle: {
            radius: input.radius,
            center: {
                longitude: input.center.lng,
                latitude: input.center.lat,
            },
        },
    });
};