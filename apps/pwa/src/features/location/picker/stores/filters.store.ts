import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { action, makeObservable, observable } from "mobx";

export class LocationPickerFiltersStore {
    locationType: GooglePLacesApiIncludedTypes | undefined = undefined;

    constructor() {
        makeObservable(this, {
            locationType: observable,
            setLocationType: action,
        });
    }

    setLocationType(type?: GooglePLacesApiIncludedTypes) {
        this.locationType = type;
    }
}