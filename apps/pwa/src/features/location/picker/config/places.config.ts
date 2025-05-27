import {
    GooglePLacesApiIncludedTypes,
    GooglePLacesApiPrimaryIncludedTypes,
} from "@/api/google/places/included-types.config";
import {
    GooglePLacesApiExcludedTypes,
    GooglePLacesApiPrimaryExcludedTypes,
} from "@/api/google/places/excluded-types.config";
import { GooglePLacesApiRecommendedIncludedTypes } from "./recommended-types.config";
import { GooglePLacesApiDisplayedTypes } from "./displayed-types.config";

export const GOOGLE_PLACES_API_INCLUDED_TYPES = {
    primaryTypes: GooglePLacesApiPrimaryIncludedTypes,
    secondaryTypes: GooglePLacesApiIncludedTypes,
    display: GooglePLacesApiDisplayedTypes,
};
export const GOOGLE_PLACES_API_EXCLUDED_TYPES = {
    primaryTypes: GooglePLacesApiPrimaryExcludedTypes,
    secondaryTypes: GooglePLacesApiExcludedTypes,
};

export const GOOGLE_PLACES_API_RECOMMENDED_TYPES = {
    includedTypes: GooglePLacesApiRecommendedIncludedTypes,
    excludedTypes: GooglePLacesApiPrimaryExcludedTypes,
};