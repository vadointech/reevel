import { QueryBuilder } from "@/types/common";
import { FetchQueryOptions } from "@tanstack/react-query";
import { mapboxBatchFeaturesResponseMapper } from "@/infrastructure/mapbox/mappers";
import { PlaceLocationEntity } from "@/entities/place";
import { GetBatchPlaceByName, getBatchPlaceByName } from "@/api/mapbox/v6/get-batch-location-by-name";

export namespace GetBatchLocationByNameQueryBuilder {
    export type TInput = {
        request: GetBatchPlaceByName.TInput;
        accessToken: string;
        signal?: AbortSignal;
    };
}

export const GetBatchLocationByNameQueryBuilder: QueryBuilder<GetBatchLocationByNameQueryBuilder.TInput, PlaceLocationEntity[]> = (
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