export class MapboxFeatureDto {
    id: string;
    type: "Feature";
    geometry: {
        type: "Point",
        coordinates: [number, number];
    };
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
}

export class MapboxResponseDto {
    attribution?: string;
    type?: "FeatureCollection";
    features: MapboxFeatureDto[];
}