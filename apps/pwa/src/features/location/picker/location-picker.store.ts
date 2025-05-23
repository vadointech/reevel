import { action, makeObservable, observable } from "mobx";
import { createMobxStoreProvider } from "@/lib/mobx";

export interface ILocationPickerConfig {
    confirmationUrl: string;
    locationSearchUrl: string;
}

class LocationPickerConfig implements ILocationPickerConfig {
    confirmationUrl: string;
    locationSearchUrl: string;

    constructor(params: ILocationPickerConfig) {
        this.confirmationUrl = params.confirmationUrl;
        this.locationSearchUrl = params.locationSearchUrl;
    }
}

class LocationPickerFilters {
    locationType?: string;

    constructor() {
        makeObservable(this, {
            locationType: observable,

            setLocationType: action,
        });
    }

    setLocationType(type?: string) {
        this.locationType = type;
    }
}

class LocationPickerStore {
    config: ILocationPickerConfig;
    filters: LocationPickerFilters;

    location: [number, number] = [0, 0];

    constructor(config: ILocationPickerConfig) {
        this.config = new LocationPickerConfig(config);
        this.filters = new LocationPickerFilters();

        makeObservable(this, {
            location: observable,

            setLocation: action,
        });

    }

    setLocation(location: [number, number]) {
        this.location = location;
    }
}

export const [LocationPickerStoreProvider, useLocationPickerStore] = createMobxStoreProvider(LocationPickerStore);