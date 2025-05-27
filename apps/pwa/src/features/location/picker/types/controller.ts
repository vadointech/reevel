import { LocationPickerRootConfigParams } from "./config";
import { IconPoint, Point } from "@/components/shared/map/types";
import { GooglePlacesApiResponse, GooglePlacesApiResponsePlace } from "@/api/google/places/types";

export interface ILocationPickerController {
    config: LocationPickerRootConfigParams

    cacheGooglePlacesApiResponse(
        value: GooglePlacesApiResponse
    ): GooglePlacesApiResponse;

    getCachedGooglePlacesApiResponse(location: [number, number]): Partial<GooglePlacesApiResponsePlace> | undefined;

    selectLocation(point: Point<IconPoint>): void
}