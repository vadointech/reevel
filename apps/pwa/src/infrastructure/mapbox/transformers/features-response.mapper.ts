import { MapboxFeaturesResponse } from "@/api/mapbox/v6/types";

type Input = MapboxFeaturesResponse;

class MapboxFeaturesResponseTransformer {
    formatAddress(input: Input): MapboxFeaturesResponse {
        console.log(input);
        return input;
    }
}

export const mapboxFeaturesResponseTransformer = new MapboxFeaturesResponseTransformer();