export type GooglePlacesApiRestrictionCircle = {
    circle: {
        center: {
            latitude: number,
            longitude: number,
        }
        radius: number,
    }
};

export type GooglePlacesApiRestrictionRectangle = {
    rectangle: {
        low: {
            latitude: number,
            longitude: number
        },
        high: {
            latitude: number,
            longitude: number
        }
    }
};

export type GooglePlacesApiRequestBody = {
    includedTypes?: readonly string[],
    excludedTypes?: readonly string[],
    includedPrimaryTypes?: readonly string[],
    excludedPrimaryTypes?: readonly string[]
    fieldMask?: Array<typeof _fieldMaskValues[number]> | "*";
    maxResultCount?: number,
    languageCode?: string;
    pageToken?: string;
};

const _fieldMaskValues = [
    "id", "displayName", "location",
    "primaryType", "primaryTypeDisplayName", "formattedAddress",
    "addressComponents", "googleMapsLinks", "googleMapsUri",
] as const;

const _addressComponentsTypes = [
    "street_number", "route", "locality", "political",
    "administrative_area_level_1", "administrative_area_level_2",
    "country", "postal_code",
];

export type GooglePlacesApiRequestParams = {
    imageMaxWidth?: number;
    imageMaxHeight?: number;
};

export type GooglePlacesApiResponsePlace = {
    id: string;
    displayName: {
        text: string;
        languageCode: string;
    };
    location: {
        latitude: number,
        longitude: number,
    };
    photos: Array<{
        heightPx: number;
        widthPx: number;
        name: string;
        flagContentUri: string;
    }>;
    googleMapsUri: string;
    primaryType: string;
    primaryTypeDisplayName: {
        text: string;
        languageCode: string;
    };
    formattedAddress: string;
    addressComponents: Array<{
        longText: string;
        shortText: string;
        types: Array<typeof _addressComponentsTypes[number]>;
    }>;
};

export type GooglePlacesApiResponse = {
    places: Array<Partial<GooglePlacesApiResponsePlace>>;
    nextPageToken?: string;
};