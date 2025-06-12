import { MapboxFeaturesResponse } from "@/api/mapbox/v6/types";
import { IconPoint, Point } from "@/components/shared/map/types";
import { PlaceLocationEntity } from "@/entities/place";

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

    toPlaceLocationEntity(input?: T): PlaceLocationEntity[] {
        const output: PlaceLocationEntity[] = [];

        if(!input) return output;

        for(const feature of input.features) {
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

        return output;
    }
}

export const mapboxFeaturesResponseMapper = new MapboxFeaturesResponseMapper();