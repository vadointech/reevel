import { IconPoint, Point } from "@/components/shared/map/types";
import { MapboxFeaturesResponse } from "@/api/mapbox/types";
import { LocationPickerPlace } from "@/features/location/picker/stores/places";

export class MapboxFeaturesResponseMapper<T extends MapboxFeaturesResponse = MapboxFeaturesResponse> {
    toIconPoint(input?: T): Point<IconPoint>[] {
        if(!input) return [];

        const points: Point<IconPoint>[] = [];

        input.features.forEach(feature => {
            points.push({
                id: feature.id,
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: feature.geometry.coordinates,
                },
                properties: {
                    id: feature.id,
                    label: feature.properties.name_preferred,
                    iconType: feature.properties.feature_type,
                    address: feature.properties.place_formatted,
                },
            });
        });

        return points;
    }

    toLocationPickerPlaces(input?: T): LocationPickerPlace[] {
        const places: LocationPickerPlace[] = [];

        if(!input) return places;

        
        return places;
    }
}

export const mapboxFeaturesResponseMapper = new MapboxFeaturesResponseMapper();