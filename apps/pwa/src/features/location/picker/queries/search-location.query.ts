import { QueryBuilder } from "@/types/common";
import { FetchQueryOptions } from "@tanstack/react-query";
import { searchLocations, SearchLocations } from "@/api/google/places/search";
import { MapProviderGL } from "@/components/shared/map/types";
import { GooglePlacesApiRestrictionRectangle } from "@/api/google/places/types";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";

export namespace SearchLocationQueryBuilder {
    export type TInput = {
        query: string;
        nextPageToken?: string;
        locationRestrictions?: GooglePlacesApiRestrictionRectangle;
    };

    export type Methods = {
        getLocationRestrictions: (bounds?: MapProviderGL.LngLatBounds) => GooglePlacesApiRestrictionRectangle | undefined
    };
}

export const SearchLocationQueryBuilder: QueryBuilder<SearchLocationQueryBuilder.TInput, SearchLocations.TOutput, SearchLocationQueryBuilder.Methods> = ({
    query,
    nextPageToken,
    locationRestrictions,
}: SearchLocationQueryBuilder.TInput): FetchQueryOptions<SearchLocations.TOutput> => {
    return {
        queryKey: SearchLocationQueryBuilder.queryKey([
            query,
            ...(
                locationRestrictions ? [
                    locationRestrictions.rectangle.high.longitude.toFixed(3),
                    locationRestrictions.rectangle.high.latitude.toFixed(3),
                    locationRestrictions.rectangle.low.longitude.toFixed(3),
                    locationRestrictions.rectangle.low.latitude.toFixed(3),
                ] : []
            ),
            ...(nextPageToken ? [nextPageToken] : []),
        ]),
        queryFn: () => searchLocations({
            body: {
                textQuery: query,
                languageCode: "uk",
                pageToken: nextPageToken,
                locationRestriction: locationRestrictions,
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
            .then(googlePlacesApiResponseTransformer.formatAddress),
        staleTime: Infinity,
    };
};

SearchLocationQueryBuilder.queryKey = (params) => {
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