import { makeObservable, observable } from "mobx";

export class LocationPickerConfirmationStore {
    location: [number, number] | null = null;

    constructor() {
        makeObservable(this, {
            location: observable,
        });
    }

    setLocation(location: [number, number] | null) {
        this.location = location;
    }
}