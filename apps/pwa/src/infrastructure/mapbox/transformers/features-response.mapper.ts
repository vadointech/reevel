import { MapboxFeaturesResponse } from "@/api/mapbox/types";

type Input = MapboxFeaturesResponse;

class MapboxFeaturesResponseTransformer {
    toLocationPickerData(input: Input): MapboxFeaturesResponse {
        console.log(input);
        return input;
    }
}

export const mapboxFeaturesResponseTransformer = new MapboxFeaturesResponseTransformer();