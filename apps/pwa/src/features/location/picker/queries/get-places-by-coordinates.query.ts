import { QueryBuilder } from "@/types/common";
import { FetchQueryOptions } from "@tanstack/react-query";
import {
    googleGeocodingApiResponseTransformer,
} from "@/infrastructure/google/transformers";
import { GetPlaceByCoordinates, getPlaceByCoordinates } from "@/api/google/geocoding";
import { googleGeocodingApiResponseMapper } from "@/infrastructure/google/mappers/geocode-response.mapper";
import { PlaceLocationEntity } from "@/entities/place";

export namespace GetPlacesByCoordinatesQueryBuilder {
    export type TInput = {
        lng: number,
        lat: number,
        signal?: AbortSignal;
    };
    export type TOutput = PlaceLocationEntity[];
}

export const GetPlacesByCoordinatesQueryBuilder: QueryBuilder<GetPlacesByCoordinatesQueryBuilder.TInput, GetPlacesByCoordinatesQueryBuilder.TOutput> = (
    input: GetPlacesByCoordinatesQueryBuilder.TInput,
): FetchQueryOptions<GetPlacesByCoordinatesQueryBuilder.TOutput> => {
    return {
        queryKey: GetPlacesByCoordinatesQueryBuilder.queryKey([input.lng, input.lat]),
        queryFn: () => getPlaceByCoordinates({
            params: {
                latlng: `${input.lat},${input.lng}`,
                language: "uk",
            },
            signal: input.signal,
        })
            .then(response => response.data || { results: [] })
            .then(googleGeocodingApiResponseTransformer.formatAddress)
            .then(googleGeocodingApiResponseMapper.toPlaceLocationEntity),
    };
};

GetPlacesByCoordinatesQueryBuilder.queryKey = (params = []) => {
    return [...GetPlaceByCoordinates.queryKey, ...params];
};