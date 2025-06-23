import { getLocationByCoordinates, GetLocationByCoordinates } from "@/api/mapbox/get-location-by-coords";
import { mapboxFeaturesResponseMapper } from "@/infrastructure/mapbox/mappers";
import { PlaceLocationEntity } from "@/entities/place";
import { QueryBuilder } from "@/lib/react-query/types";

export namespace GetLocationByCoordinatesQueryBuilder {
    export type TInput = Omit<GetLocationByCoordinates.TParams, "access_token"> & {
        signal?: AbortSignal;
    };
    export type TParams = Partial<Omit<GetLocationByCoordinates.TParams, "access_token">> & {
        accessToken: string;
    };
}

export const GetLocationByCoordinatesQueryBuilder: QueryBuilder<GetLocationByCoordinatesQueryBuilder.TInput, PlaceLocationEntity[], GetLocationByCoordinatesQueryBuilder.TParams> = ({
    accessToken,
    ...params
}) => {
    return ({ signal, ...input }) => {
        return {
            queryKey: GetLocationByCoordinatesQueryBuilder.queryKey([input.longitude, input.latitude]),
            queryFn: () => getLocationByCoordinates({
                params: {
                    access_token: accessToken,
                    ...params,
                    ...input,
                },
                signal: signal,
            })
                .then(response => response.data || { features: [] })
                .then(mapboxFeaturesResponseMapper.toPlaceLocationEntity),
        };
    };
};

GetLocationByCoordinatesQueryBuilder.queryKey = (params = []) => {
    return [...GetLocationByCoordinates.queryKey, ...params];
};