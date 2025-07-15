import { FetchQueryOptions } from "@tanstack/react-query";
import { searchLocations, SearchLocations } from "@/api/google/places/search";

import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

import { PlaceLocationEntity } from "@/entities/place";
import { MapProviderGL } from "@/components/shared/map/types";
import { IQueryBuilderMethods, QueryBuilderQuery } from "@/lib/react-query";
import { GooglePlacesApiRestrictionRectangle } from "@/api/google/places/types";

export namespace SearchLocationQueryBuilder {
    export type TInput = {
        query: string;
        nextPageToken?: string;
        locationRestrictions?: GooglePlacesApiRestrictionRectangle;
    };

    export type TOutput = {
        nextPageToken?: string;
        places: PlaceLocationEntity[]
    };

    export interface Methods extends IQueryBuilderMethods<SearchLocationQueryBuilder.TInput, SearchLocationQueryBuilder.TOutput> {
        getLocationRestrictions: (bounds?: MapProviderGL.LngLatBounds) => GooglePlacesApiRestrictionRectangle | undefined
    }
}

export const SearchLocationQueryBuilder: QueryBuilderQuery<SearchLocationQueryBuilder.TInput, SearchLocationQueryBuilder.TOutput, SearchLocationQueryBuilder.Methods> = (
    input: SearchLocationQueryBuilder.TInput,
): FetchQueryOptions<SearchLocationQueryBuilder.TOutput> => {
    return {
        queryKey: SearchLocationQueryBuilder.queryKey([
            input.query,
            ...(
                input.locationRestrictions ? [
                    input.locationRestrictions.rectangle.high.longitude.toFixed(3),
                    input.locationRestrictions.rectangle.high.latitude.toFixed(3),
                    input.locationRestrictions.rectangle.low.longitude.toFixed(3),
                    input.locationRestrictions.rectangle.low.latitude.toFixed(3),
                ] : []
            ),
            ...(input.nextPageToken ? [input.nextPageToken] : []),
        ]),
        queryFn: () => SearchLocationQueryBuilder.queryFunc(input),
    };
};

SearchLocationQueryBuilder.queryFunc = (input) => {
    return searchLocations({
        body: {
            textQuery: input.query,
            languageCode: "uk",
            pageToken: input.nextPageToken,
            locationRestriction: input.locationRestrictions,
            fieldMask: [
                "id",
                "displayName",
                "location",
                "primaryType",
                "primaryTypeDisplayName",
                "formattedAddress",
                "addressComponents",
                "googleMapsUri",
            ],
        },
    })
        .then(response => response.data || { places: [] })
        .then(googlePlacesApiResponseTransformer.formatAddress)
        .then((response) => {
            return {
                nextPageToken: response.nextPageToken,
                places: googlePlacesApiResponseMapper.toPlaceLocationEntity(response),
            };
        });
};

SearchLocationQueryBuilder.queryKey = (params = []) => {
    return [...SearchLocations.queryKey, ...params];
};

SearchLocationQueryBuilder.getLocationRestrictions = (bounds?: MapProviderGL.LngLatBounds) => {
    if(!bounds) return;

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    return {
        rectangle: {
            low: {
                latitude: sw.lat,
                longitude: sw.lng,
            },
            high: {
                latitude: ne.lat,
                longitude: ne.lng,
            },
        },
    };
};