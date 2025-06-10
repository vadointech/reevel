import {
    GooglePLacesApiIncludedTypes,
    GooglePLacesApiPrimaryIncludedTypes,
} from "@/api/google/places/_internal/included-types.config";
import {
    GooglePLacesApiExcludedTypes,
    GooglePLacesApiPrimaryExcludedTypes,
} from "@/api/google/places/_internal/excluded-types.config";
import { GooglePLacesApiDisplayedTypes } from "./displayed-types.config";
import { IconPoint } from "@/components/shared/map/types";
import { IncludedTypesMarker } from "@/features/location/picker/config/icons.config";

export const GOOGLE_PLACES_API_INCLUDED_TYPES = {
    primaryTypes: GooglePLacesApiPrimaryIncludedTypes,
    secondaryTypes: GooglePLacesApiIncludedTypes,
    display: GooglePLacesApiDisplayedTypes,
};
export const GOOGLE_PLACES_API_EXCLUDED_TYPES = {
    primaryTypes: GooglePLacesApiPrimaryExcludedTypes,
    secondaryTypes: GooglePLacesApiExcludedTypes,
};

export function getIncludedTypeMarker({ iconType }: IconPoint) {
    const defined = IncludedTypesMarker[iconType as GooglePLacesApiIncludedTypes];
    if(defined) return defined;

    const related = Object.keys(IncludedTypesMarker).find(key => iconType?.includes(key));
    if(related) return IncludedTypesMarker[related as GooglePLacesApiIncludedTypes];

    return IncludedTypesMarker.default;
}