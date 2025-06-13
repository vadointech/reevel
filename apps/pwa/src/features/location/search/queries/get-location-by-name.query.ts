import { FetchQueryOptions } from "@tanstack/react-query";
import { getPlaceByName, GetPlaceByName } from "@/api/mapbox/get-location-by-name";
import { mapboxFeaturesResponseMapper } from "@/infrastructure/mapbox/mappers";

import { PlaceLocationEntity } from "@/entities/place";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace GetLocationByNameQueryBuilder {
    export type TInput = Omit<GetPlaceByName.TParams, "q" | "access_token"> & {
        name: string;
        accessToken: string;
        signal?: AbortSignal;
    };
}

export const GetLocationByNameQueryBuilder: QueryBuilderQuery<GetLocationByNameQueryBuilder.TInput, PlaceLocationEntity[]> = (
    { signal, ...input }: GetLocationByNameQueryBuilder.TInput,
): FetchQueryOptions<PlaceLocationEntity[]> => {
    return {
        queryKey: GetLocationByNameQueryBuilder.queryKey([input.name]),
        queryFn: () => getPlaceByName({
            params: {
                q: input.name,
                access_token: input.accessToken,
                ...input,
            },
            signal,
        })
            .then(response => response.data || { features: [] })
            .then(mapboxFeaturesResponseMapper.toPlaceLocationEntity),
    };
};

GetLocationByNameQueryBuilder.queryKey = (params = []) => {
    return [...GetPlaceByName.queryKey, ...params];
};