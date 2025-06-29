import { action, makeObservable, observable } from "mobx";
import { IDiscoverFiltersStore } from "../types";

export class DiscoverFiltersStore implements IDiscoverFiltersStore {
    locationInterest: string | undefined = undefined;

    constructor() {
        makeObservable(this, {
            locationInterest: observable,
            setLocationInterest: action,
        });
    }

    setLocationInterest(locationInterest: string | undefined) {
        this.locationInterest = locationInterest;
    }
}