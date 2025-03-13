import { MapboxFeatureResponse } from "@/api/mapbox/types";

class MapboxFeatureResponseTransformer<T extends MapboxFeatureResponse = MapboxFeatureResponse> {

    toConfirmationDrawer(input?: T): T | undefined {
        if(!input) return undefined;
        return {
            ...input,
            place_name: input?.place_name.split(",").slice(0, 1).join(""),
        };
    }


    toLocationList(input: T): T {
        return {
            ...input,
            place_name: input.place_name.split(",").slice(0, 2).join(", "),
        };
    }
}

export const mapboxFeatureResponseTransformer = new MapboxFeatureResponseTransformer();