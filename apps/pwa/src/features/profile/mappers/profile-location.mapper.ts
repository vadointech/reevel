import { PlaceLocationEntity } from "@/entities/place";
import { CitiesEntity } from "@/entities/cities";

export class ProfileLocationMapper {
    static toPlaceLocationEntity(input: CitiesEntity): PlaceLocationEntity {
        const [lng, lat] = input.center.coordinates;
        return {
            id: input.id,
            location: { latitude: lat, longitude: lng },
            displayName: input.name,
            primaryType: "",
            primaryTypeDisplayName: "",
            formattedAddress: input.name,
            googleMapsUri: "",
            bbox: undefined,
        };
    }
}