import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { BasePoint, Point } from "@/components/shared/map/types";

export class GooglePlacesApiResponseMapper<T extends GooglePlacesApiResponse = GooglePlacesApiResponse> {
    toBasePoint(input?: T): Point<BasePoint>[] {
        if(!input) return [];

        return input.places.map(item => ({
            id: item.id,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    item.location.longitude,
                    item.location.latitude,
                ],
            },
            properties: {
                id: item.id,
                image: item.photos?.[0].imageUri,
                label: item.displayName.text,
                primaryType: item.primaryType,
                icon: {
                    mask: item.iconMaskBaseUri,
                    color: item.iconBackgroundColor,
                },
            },
        }));
    }
}

export const googlePlacesApiResponseMapper = new GooglePlacesApiResponseMapper();