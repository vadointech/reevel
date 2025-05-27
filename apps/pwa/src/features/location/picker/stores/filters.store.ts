import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { makeObservable, observable } from "mobx";

export class LocationPickerFiltersStore {
    locationType: GooglePLacesApiIncludedTypes | null = null;

    constructor() {
        makeObservable(this, {
            locationType: observable,
        });
    }

    setLocationType(type: GooglePLacesApiIncludedTypes | null) {
        this.locationType = type;
    }
}