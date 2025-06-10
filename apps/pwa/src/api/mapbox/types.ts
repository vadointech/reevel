export type MapboxRequestParams = {
    permanent: boolean;
    country: string;
    language: string;
    limit: number;
    types: string;
    worldview: string;
};

export type MapboxFeaturesResponseFeature = {
    id: string;
    type: "Feature";
    geometry: {
        type: "Point",
        coordinates: [number, number];
    }
    properties: {
        context: {
            address: {

            }
            country: {

            }
            place: {

            }
            postcode: {

            }
            region: {

            }
            street: {

            }
        }
        coordinates: {
            accuracy: string;
            longitude: number;
            latitude: number;
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