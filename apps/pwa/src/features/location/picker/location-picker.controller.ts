import { ILocationPickerController, LocationPickerRootConfigParams } from "./types";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "@/features/location/picker/stores";
import { IconPoint, Point } from "@/components/shared/map/types";
import { GooglePlacesApiResponse, GooglePlacesApiResponsePlace } from "@/api/google/places/types";

export class LocationPickerController implements ILocationPickerController {
    constructor(
        private readonly _config: LocationPickerRootConfigParams,
        private readonly searchStore: LocationPickerSearchStore,
        private readonly filtersStore: LocationPickerFiltersStore,
        private readonly confirmationStore: LocationPickerConfirmationStore,
        private readonly persistentCacheStore: Map<string, any>,
    ) {}

    get config() {
        return this._config;
    }

    cacheGooglePlacesApiResponse(response: GooglePlacesApiResponse) {
        response.places.forEach(place => {
            if(place.location) {
                this.persistentCacheStore.set(`${place.location.longitude},${place.location.latitude}`, place);
            }
        });

        return response;
    }

    getCachedGooglePlacesApiResponse(location: [number, number]): Partial<GooglePlacesApiResponsePlace> | undefined {
        return this.persistentCacheStore.get(`${location[0]},${location[1]}`);
    }

    selectLocation(point: Point<IconPoint>) {
        this.confirmationStore.setPoint(point);
    }
}