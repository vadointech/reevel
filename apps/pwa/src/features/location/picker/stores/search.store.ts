import { IconPoint, Point } from "@/components/shared/map/types";
import { action, makeObservable, observable } from "mobx";

export class LocationPickerSearchStore {
    searchResults: Point<IconPoint>[] = [];

    constructor() {
        makeObservable(this, {
            searchResults: observable,
            setSearchResults: action,
        });
    }

    setSearchResults(searchResults: Point<IconPoint>[]) {
        this.searchResults = searchResults;
    }
}