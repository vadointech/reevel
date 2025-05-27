import {
    GooglePLacesApiIncludedTypes,
} from "@/api/google/places";

export const GooglePLacesApiRecommendedIncludedTypes = [
    "park",
    "stadium",
    "cafe",
    "bar",
    "tourist_attraction",
] as const satisfies Partial<GooglePLacesApiIncludedTypes>[];