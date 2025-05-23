import { Locale } from "@/types/common";
import { GooglePLacesApiIncludedTypes, GooglePLacesApiPrimaryIncludedTypes } from "./included-types.config";
import { GooglePLacesApiExcludedTypes, GooglePLacesApiPrimaryExcludedTypes } from "./excluded-types.config";

export type GooglePlacesApiRequestBody = {
    includedTypes?: readonly GooglePLacesApiIncludedTypes[],
    excludedTypes?: readonly GooglePLacesApiExcludedTypes[],
    includedPrimaryTypes?: readonly GooglePLacesApiPrimaryIncludedTypes[],
    excludedPrimaryTypes?: readonly GooglePLacesApiPrimaryExcludedTypes[]
    maxResultCount?: number,
    locationRestriction: {
        circle: {
            center: {
                latitude: number,
                longitude: number,
            }
            radius: number,
        }
    }
};

const _fieldMaskValues = [
    "id", "displayName", "photos", "location", "types",
    "primaryType", "primaryTypeDisplayName",
] as const;

export type GooglePlacesApiRequestParams = {
    fieldMask: Array<typeof _fieldMaskValues[number]>;
    imageMaxWidth: number;
    imageMaxHeight: number;
};

export type GooglePlacesApiResponse = {
    places: Array<{
        id: string;
        displayName: {
            text: string;
            languageCode: Locale
        },
        location: {
            latitude: number,
            longitude: number,
        }
        primaryType?: string;
        primaryTypeDisplayName?: {
            text: string;
            languageCode: string;
        },
        photos?: Array<{
            heightPx: number;
            widthPx: number;
            name: string;
            flagContentUri: string;
            imageUri?: string; // Custom field
        }>
    }>
};