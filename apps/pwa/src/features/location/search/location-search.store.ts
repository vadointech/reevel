import { ILocationSearchStore } from "@/features/location/search/types";
import { action, makeObservable, observable, reaction } from "mobx";
import { initStore } from "@/lib/mobx";
import { PlaceLocationEntity } from "@/entities/place";

export class LocationSearchStore implements ILocationSearchStore {
    searchQuery: string = "";
    nextPageToken: string | undefined = undefined;
    searchResults: PlaceLocationEntity[] | null = null;
    locationToConfirm: PlaceLocationEntity | null = null;

    private readonly disposeReaction?: () => void;

    constructor(
        init?: Partial<ILocationSearchStore>,
        syncLocationToConfirm?: (location: PlaceLocationEntity | null) => void,
    ) {
        initStore(this, init);

        makeObservable(this, {
            searchQuery: observable,
            searchResults: observable,
            locationToConfirm: observable,

            setSearchQuery: action,
            setSearchResults: action,
            setLocationToConfirm: action,
        });

        if(syncLocationToConfirm) {
            this.disposeReaction = reaction(
                () => this.locationToConfirm,
                syncLocationToConfirm,
            );
        }
    }

    dispose() {
        this.disposeReaction?.();
    }

    setSearchQuery(searchQuery: string) {
        this.searchQuery = searchQuery;
    }

    setSearchResults(searchResults: PlaceLocationEntity[] | null) {
        this.searchResults = searchResults;
    }

    setLocationToConfirm(locationToConfirm: PlaceLocationEntity | null) {
        this.locationToConfirm = locationToConfirm;
    }

    setNextPageToken(nextPageToken?: string) {
        this.nextPageToken = nextPageToken;
    }
}