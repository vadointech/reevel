import { GooglePlacesApiRequestBody } from "@/api/google/places/types";

export function getGooglePlacesApiFieldMask(body?: GooglePlacesApiRequestBody) {
    let fieldMask = "places.id,places.displayName,places.location-badge";


    if(body?.fieldMask) {
        if(typeof body.fieldMask === "string") {
            fieldMask = body.fieldMask;
        } else {
            fieldMask = body.fieldMask.map(mask => `places.${mask}`).join(",");
        }
    }

    delete body?.fieldMask;
    return { fieldMask, body };
}