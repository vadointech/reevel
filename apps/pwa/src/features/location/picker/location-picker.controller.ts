import { ILocationPickerController, LocationPickerRootConfigParams } from "./types";
import {
    LocationPickerConfirmationStore,
    LocationPickerFiltersStore,
    LocationPickerSearchStore,
} from "@/features/location/picker/stores";

export class LocationPickerController implements ILocationPickerController {
    constructor(
        private readonly _config: LocationPickerRootConfigParams,
        private readonly searchStore: LocationPickerSearchStore,
        private readonly filtersStore: LocationPickerFiltersStore,
        private readonly confirmationStore: LocationPickerConfirmationStore,
    ) {}

    get config() {
        return this._config;
    }
}