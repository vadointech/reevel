import { _addressComponentsTypes } from "../places/types";

export type GoogleGeocodingApiRequestParameters = {
    latlng: string;
    key: string;
    language: string;
    region: string;
    result_type: string;
};

const _addressTypes = [
    "street_address", "route", "intersection", "political", "country",
    "administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3",
    "administrative_area_level_4", "administrative_area_level_5", "administrative_area_level_6", "administrative_area_level_7",
    "colloquial_area", "locality", "sublocality", "neighborhood", "premise",
    "subpremise", "plus_code", "postal_code", "natural_feature", "airport",
    "park", "point_of_interest",
] as const;

export type GoogleGeocodingApiResponseResult = {
    place_id: string;
    formatted_address: string;
    address_components: Array<{
        long_name: string;
        short_name: string;
        types: Array<typeof _addressComponentsTypes[number]>;
    }>;
    geometry: {
        location: {
            lat: number;
            lng: number;
        }
    };
    location_type: "ROOFTOP" | "RANGE_INTERPOLATED" | "GEOMETRIC_CENTER" | "APPROXIMATE";
    viewport: {
        northeast: {
            lat: number;
            lng: number;
        },
        southwest: {
            lat: number;
            lng: number;
        }
    };
    types: Array<typeof _addressTypes[number]>;

    display_name?: string; // Custom field
};

export type GoogleGeocodingApiResponse = {
    plus_code?: {
        compound_code: string;
        global_code: string;
    }
    results: GoogleGeocodingApiResponseResult[];
};