export type MapboxRequestParams = {
    access_token: string;

    permanent?: boolean;
    autocomplete?: boolean;
    bbox?: string;
    country?: string;
    format?: string;
    language?: string;
    limit?: number;
    proximity?: string;
    types?: string;
    worldview?: string;
};

export type MapboxFeaturesResponseFeature = {
    id: string;
    type: "Feature";
    geometry: {
        type: "Point",
        coordinates: [number, number];
    }
    properties: {
        coordinates: {
            accuracy: string;
            longitude: number;
            latitude: number;
        }
        bbox: [number, number, number, number];
        context: {
            address: object
            country: object
            place: object
            postcode: object
            region: object
            street: object
        }
        mapbox_id: string;
        feature_type: string;
        full_address: string;
        name: string;
        name_preferred: string;
        place_formatted: string;
    };
};

export type MapboxFeaturesResponse = {
    attribution?: string;
    type?: "FeatureCollection"
    features: MapboxFeaturesResponseFeature[];
};

export type MapboxBatchFeaturesResponse = {
    batch: MapboxFeaturesResponse[];
};