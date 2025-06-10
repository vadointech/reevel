import { PlaceLocationEntity } from "@/entities/place";
import { GoogleGeocodingApiResponse } from "@/api/google/geocoding/types";

export class GoogleGeocodingApiResponseMapper<T extends GoogleGeocodingApiResponse = GoogleGeocodingApiResponse> {
    toPlaceLocationEntity(input?: T): PlaceLocationEntity[] {
        const output: PlaceLocationEntity[] = [];

        if(!input) return output;

        for(const result of input.results) {
            if(
                !result.place_id ||
              !result.geometry ||
              !result.display_name ||
              !result.formatted_address
            ) continue;

            output.push({
                id: result.place_id,
                location: {
                    longitude: result.geometry.location.lng,
                    latitude: result.geometry.location.lat,
                },
                displayName: result.display_name,
                primaryType: "street_address",
                primaryTypeDisplayName: "Адреса", // "Address",
                formattedAddress: result.formatted_address,
                googleMapsUri: `https://www.google.com/maps?q=${result.geometry.location.lat},${result.geometry.location.lng}`,
            });
        }

        return output;
    }
}

export const googleGeocodingApiResponseMapper = new GoogleGeocodingApiResponseMapper();