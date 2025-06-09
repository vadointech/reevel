import { PlaceLocationEntity } from "@/entities/place/index";
import { IconPoint, Point } from "@/components/shared/map/types";

class PlaceLocationEntityMapper<T extends PlaceLocationEntity = PlaceLocationEntity> {

    toIconPoint(input?: T[]): Point<IconPoint>[] {
        if(!input) return [];

        const points: Point<IconPoint>[] = [];

        input.forEach(place => {
            if(place.id && place.location && place.displayName) {
                points.push({
                    id: place.id,
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            place.location.longitude,
                            place.location.latitude,
                        ],
                    },
                    properties: {
                        id: place.id,
                        label: place.displayName,
                        iconType: place.primaryType,
                        address: place.formattedAddress,
                    },
                });
            }
        });

        return points;
    }
}

export const placeLocationEntityMapper = new PlaceLocationEntityMapper();