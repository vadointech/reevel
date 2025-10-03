import { ProfileLocationsEntity } from "@/entities/profile";
import { z } from "zod";
import { placeLocationEntity } from "@/entities/place";

type PlaceLocation = z.infer<typeof placeLocationEntity>;

export function mapProfileLocationToForm(
    loc: ProfileLocationsEntity,
): PlaceLocation {
    const [lng, lat] = loc.center.coordinates;

    return {
        id: loc.id,
        location: { latitude: lat, longitude: lng },
        displayName: loc.placeName,
        primaryType: "",
        primaryTypeDisplayName: "",
        formattedAddress: loc.placeName,
        googleMapsUri: "",
        bbox: undefined, 
    };
}
