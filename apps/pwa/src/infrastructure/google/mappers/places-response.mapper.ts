import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { IconPoint, Point } from "@/components/shared/map/types";

export class GooglePlacesApiResponseMapper<T extends GooglePlacesApiResponse = GooglePlacesApiResponse> {
    toIconPoint(input?: T): Point<IconPoint>[] {
        if(!input) return [];

        const points: Point<IconPoint>[] = [];

        input.places.forEach(place => {
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
                        label: place.displayName.text,
                        iconType: place.primaryType,
                        address: place.formattedAddress,
                    },
                });
            }
        });

        return points;
    }

    toSearchPoint() {

    }
}

export const googlePlacesApiResponseMapper = new GooglePlacesApiResponseMapper();