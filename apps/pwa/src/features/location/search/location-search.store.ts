import { ILocationSearchStore } from "@/features/location/search/types";
import { action, makeObservable, observable } from "mobx";
import { constructorInit } from "@/lib/init";
import { PlaceLocationEntity } from "@/entities/place";

export class LocationSearchStore implements ILocationSearchStore {
    searchQuery: string = "";
    nextPageToken: string | undefined = undefined;
    searchResults: PlaceLocationEntity[] | null = null;

    constructor(init?: Partial<ILocationSearchStore>) {
        makeObservable(this, {
            searchQuery: observable,
            searchResults: observable,

            setSearchQuery: action,
            setSearchResults: action,
        });

        constructorInit(this, init);
    }

    dispose() {}

    setSearchQuery(searchQuery: string) {
        this.searchQuery = searchQuery;
    }

    setSearchResults(searchResults: PlaceLocationEntity[] | null) {
        this.searchResults = searchResults;
    }

    setNextPageToken(nextPageToken?: string) {
        this.nextPageToken = nextPageToken;
    }
}