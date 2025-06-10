export type MapboxRequestParams = {
    types: string;
    access_token: string;
    language: string;
    limit: number;
    country: string;
    q: string;
    bbox: string;
};

export type MapboxFeatureResponse = {
    id: string;
    place_name: string;
    place_type: string;
    properties: {
        mapbox_id: string;
        wikidata: string;
    };
    relevance: number;
    text: string;
    type: string;
    bbox: [number, number, number, number];
    center: [number, number];
    context: Array<{
        id: string;
        mapbox_id: string;
        short_code: string;
        text: string;
        wikidata: string;
    }>;
    geometry: {
        type: "Point",
        coordinates: [number, number];
    }
};

// New API
// export type MapboxRequestParams = {
//     permanent: boolean;
//     country: string;
//     language: string;
//     limit: number;
//     types: string;
//     worldview: string;
// };
//
// export type MapboxFeaturesResponseFeature = {
//     id: string;
//     type: "Feature";
//     geometry: {
//         type: "Point",
//         coordinates: [number, number];
//     }
//     properties: {
//         context: {
//             address: {
//
//             }
//             country: {
//
//             }
//             place: {
//
//             }
//             postcode: {
//
//             }
//             region: {
//
//             }
//             street: {
//
//             }
//         }
//         coordinates: {
//             accuracy: string;
//             longitude: number;
//             latitude: number;
//         }
//         mapbox_id: string;
//         feature_type: string;
//         full_address: string;
//         name: string;
//         name_preferred: string;
//         place_formatted: string;
//     };
// };
//
// export type MapboxFeaturesResponse = {
//     attribution?: string;
//     type?: "FeatureCollection"
//     features: MapboxFeaturesResponseFeature[];
// };