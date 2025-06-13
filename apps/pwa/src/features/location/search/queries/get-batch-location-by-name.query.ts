import { FetchQueryOptions } from "@tanstack/react-query";
import { mapboxBatchFeaturesResponseMapper } from "@/infrastructure/mapbox/mappers";
import { GetBatchPlaceByName, getBatchPlaceByName } from "@/api/mapbox/get-batch-location-by-name";
import { PlaceLocationEntity } from "@/entities/place";
import { QueryBuilderQuery } from "@/lib/react-query";

export namespace GetBatchLocationByNameQueryBuilder {
    export type TInput = {
        request: GetBatchPlaceByName.TInput;
        accessToken: string;
        signal?: AbortSignal;
    };
}

export const GetBatchLocationByNameQueryBuilder: QueryBuilderQuery<GetBatchLocationByNameQueryBuilder.TInput, PlaceLocationEntity[]> = (
    { signal, ...input }: GetBatchLocationByNameQueryBuilder.TInput,
): FetchQueryOptions<PlaceLocationEntity[]> => {
    return {
        queryKey: GetBatchLocationByNameQueryBuilder.queryKey(),
        queryFn: () => getBatchPlaceByName({
            body: input.request,
            params: {
                access_token: input.accessToken,
            },
            signal,
        })
            .then(response => response.data || { batch: [] })
            .then(mapboxBatchFeaturesResponseMapper.toPlaceLocationEntity),
    };
};

GetBatchLocationByNameQueryBuilder.queryKey = (params = []) => {
    return [...GetBatchPlaceByName.queryKey, ...params];
};