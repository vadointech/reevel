import { IconPoint } from "@/components/shared/map/types";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { IncludedTypesMarker } from "../config/icons.config";

export function getIncludedTypeMarker({ iconType }: IconPoint) {
    const defined = IncludedTypesMarker[iconType as GooglePLacesApiIncludedTypes];
    if(defined) return defined;

    const related = Object.keys(IncludedTypesMarker).find(key => iconType?.includes(key));
    if(related) return IncludedTypesMarker[related as GooglePLacesApiIncludedTypes];

    return IncludedTypesMarker.default;
}