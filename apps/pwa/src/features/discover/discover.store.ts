import { IDiscoverStore } from "@/features/discover/types";
import { action, makeObservable, observable } from "mobx";

export class DiscoverStore implements IDiscoverStore {
    collectionToPreview: string = "/discover";
    pointToPreview: string | null = null;
    interestFilter: string | null = null;

    constructor() {
        makeObservable(this, {
            interestFilter: observable,
            setCollectionToPreview: action,
            setPointToPreview: action,
            setInterestFilter: action,
        });
    }

    dispose() {}

    setCollectionToPreview(collectionToPreview: string) {
        this.collectionToPreview = collectionToPreview;
    }

    setPointToPreview(pointToPreview: string | null) {
        this.pointToPreview = pointToPreview;
    }

    setInterestFilter(interestFilter: string | null) {
        this.interestFilter = interestFilter;
    }
}