import { IconPoint, Point } from "@/components/shared/map/types";
import { action, computed, makeObservable, observable } from "mobx";

export class LocationPickerSearchStore {
    searchQuery: string = "";
    nextPageToken?: string = undefined;
    locationRestrictions: boolean = true;

    allSearchResults: Point<IconPoint>[] | null = [];
    nearbySearchResults: Point<IconPoint>[] | null = [];

    constructor() {
        makeObservable(this, {
            searchQuery: observable,
            nextPageToken: observable,
            locationRestrictions: observable,
            allSearchResults: observable,
            nearbySearchResults: observable,

            searchResults: computed,

            setSearchQuery: action,
            setSearchResults: action,
            setNextPageToken: action,
            appendSearchResults: action,
            setLocationRestrictions: action,
        });
    }

    get searchResults() {
        return this.locationRestrictions ? this.nearbySearchResults : this.allSearchResults;
    }

    setSearchQuery(query: string) {
        this.searchQuery = query;
    }

    setNextPageToken(token?: string) {
        this.nextPageToken = token;
    }

    setSearchResults(results: Point<IconPoint>[] | null) {
        if(this.locationRestrictions) {
            this.nearbySearchResults = results;
            this.allSearchResults = [];
        } else {
            this.allSearchResults = results;
            this.nearbySearchResults = [];
        }
    }

    appendSearchResults(results: Point<IconPoint>[]) {
        this.setSearchResults([
            ...(this.searchResults ? this.searchResults : []),
            ...results,
        ]);
    }

    setLocationRestrictions(value: boolean) {
        this.locationRestrictions = value;
    }
}