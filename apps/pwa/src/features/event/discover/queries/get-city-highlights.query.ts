import { EventEntity } from "@/entities/event";
import { QueryBuilderQuery } from "@/lib/react-query";
import { getEventCityHighlightsCollection, GetEventCityHighlightsCollection } from "@/api/event";
import { MapProviderGL } from "@/components/shared/map/types";

export namespace GetCityHighlightsQueryBuilder {
    export type TInput = {
        center: MapProviderGL.LngLat,
        radius: number,
        regionId?: string,
        filter?: string,
        nextHeaders?: Headers
    };
    export type TOutput = EventEntity[];
}

export const GetCityHighlightsQueryBuilder: QueryBuilderQuery<GetCityHighlightsQueryBuilder.TInput, GetCityHighlightsQueryBuilder.TOutput> = (
    input,
) => {
    return {
        queryKey: GetCityHighlightsQueryBuilder.queryKey([input.regionId]),
        queryFn: () => GetCityHighlightsQueryBuilder.queryFunc(input),
    };
};

GetCityHighlightsQueryBuilder.queryFunc = (input) => {
    return getEventCityHighlightsCollection({
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

GetCityHighlightsQueryBuilder.queryKey = (params = []) => {
    return [...GetEventCityHighlightsCollection.queryKey, ...params];
};