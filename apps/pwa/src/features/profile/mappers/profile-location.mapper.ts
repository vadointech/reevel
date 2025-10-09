import { PlaceLocationEntity } from "@/entities/place";
import { ProfileLocationsEntity } from "@/entities/profile";

export class ProfileLocationMapper {
    static toPlaceLocationEntity(input: ProfileLocationsEntity): PlaceLocationEntity {
        const [lng, lat] = input.center.coordinates;
        return {
            id: input.id,
            location: { latitude: lat, longitude: lng },
            displayName: input.placeName,
            primaryType: "",
            primaryTypeDisplayName: "",
            formattedAddress: input.placeName,
            googleMapsUri: "",
            bbox: undefined,
        };
    }
}