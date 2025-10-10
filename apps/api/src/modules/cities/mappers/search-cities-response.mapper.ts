import { MapboxFeatureDto } from "@/infrastructure/mapbox/dto";
import { SearchCitiesResponseDto } from "../dto";

export function mapboxFeatureToSearchCitiesResponseDto(feature: MapboxFeatureDto) {
    return new SearchCitiesResponseDto({
        id: feature.id,
        location: {
            longitude: feature.properties.coordinates.longitude,
            latitude: feature.properties.coordinates.latitude,
        },
        bbox: feature.properties.bbox,
        displayName: feature.properties.name,
        primaryType: "street_address",
        primaryTypeDisplayName: "Адреса",
        formattedAddress: feature.properties.full_address,
        googleMapsUri: `https://www.google.com/maps?q=${feature.properties.coordinates.latitude},${feature.properties.coordinates.longitude}`,
    });
}