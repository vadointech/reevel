import { IconPoint, Point } from "@/components/shared/map/types";
import { action, makeObservable, observable } from "mobx";

export class LocationPickerSearchStore {
    searchResults: Point<IconPoint>[] = [];
    locationRestrictions: boolean = true;

    constructor() {
        makeObservable(this, {
            searchResults: observable,
            locationRestrictions: observable,

            setSearchResults: action,
            setLocationRestrictions: action,
        });
    }

    setSearchResults(searchResults: Point<IconPoint>[]) {
        this.searchResults = searchResults;
    }

    setLocationRestrictions(value: boolean) {
        this.locationRestrictions = value;
    }
}