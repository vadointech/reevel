import { GooglePlacesApiResponse } from "@/api/google/places/types";
import { PlaceLocationEntity } from "@/entities/place";

export class GooglePlacesApiResponseMapper<T extends GooglePlacesApiResponse = GooglePlacesApiResponse> {
    toPlaceLocationEntity(input?: T): PlaceLocationEntity[] {
        const output: PlaceLocationEntity[] = [];

        if(!input) return output;

        for(const place of input.places) {
            if(
                !place.id ||
                  !place.location ||
                  !place.displayName ||
                  !place.primaryType ||
                  !place.primaryTypeDisplayName ||
                  !place.formattedAddress ||
                  !place.googleMapsUri
            ) continue;

            output.push({
                id: place.id,
                location: place.location,
                displayName: place.displayName.text,
                primaryType: place.primaryType,
                primaryTypeDisplayName: place.primaryTypeDisplayName.text,
                formattedAddress: place.formattedAddress,
                googleMapsUri: place.googleMapsUri,
            });
        }

        return output;
    }
}

export const googlePlacesApiResponseMapper = new GooglePlacesApiResponseMapper();