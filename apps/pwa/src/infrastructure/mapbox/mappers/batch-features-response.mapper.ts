import { MapboxBatchFeaturesResponse } from "@/api/mapbox/v6/types";
import { PlaceLocationEntity } from "@/entities/place";

export class MapboxBatchFeaturesResponseMapper<T extends MapboxBatchFeaturesResponse = MapboxBatchFeaturesResponse> {
    toPlaceLocationEntity(input?: T): PlaceLocationEntity[] {
        const output: PlaceLocationEntity[] = [];

        if(!input) return output;

        for(const batch of input.batch) {
            for(const feature of batch.features) {
                output.push({
                    id: feature.id,
                    location: {
                        longitude: feature.properties.coordinates.longitude,
                        latitude: feature.properties.coordinates.latitude,
                    },
                    bbox: feature.properties.bbox,
                    displayName: feature.properties.name,
                    primaryType: "street_address",
                    primaryTypeDisplayName: "Адреса", // "Address",
                    formattedAddress: feature.properties.full_address,
                    googleMapsUri: `https://www.google.com/maps?q=${feature.properties.coordinates.latitude},${feature.properties.coordinates.longitude}`,
                });
            }
        }

        return output;
    }
}

export const mapboxBatchFeaturesResponseMapper = new MapboxBatchFeaturesResponseMapper();