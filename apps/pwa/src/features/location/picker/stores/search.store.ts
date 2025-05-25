import { BasePoint, Point } from "@/components/shared/map/types";
import { action, makeObservable, observable } from "mobx";

export class LocationPickerSearchStore {
    searchTerm = "";
    searchResults: Point<BasePoint>[] = [];

    constructor() {
        makeObservable(this, {
            searchTerm: observable,
            searchResults: observable,

            setSearchTerm: action,
            setSearchResults: action,
        });
    }

    setSearchTerm(searchTerm: string) {
        this.searchTerm = searchTerm;
    }

    setSearchResults(searchResults: Point<BasePoint>[]) {
        this.searchResults = searchResults;
    }
}