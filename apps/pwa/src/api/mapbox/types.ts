export type MapboxRequestParams = {
    types: string;
    access_token: string;
    language: string;
    limit: number;
    country: string;
    q?: string;
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