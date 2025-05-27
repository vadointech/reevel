import { makeObservable, observable } from "mobx";
import { IconPoint, Point } from "@/components/shared/map/types";

export class LocationPickerConfirmationStore {
    point: Point<IconPoint> | null = null;
    location: [number, number] | null = null;

    constructor() {
        makeObservable(this, {
            location: observable,
            point: observable,
        });
    }

    setPoint(point: Point<IconPoint> | null) {
        this.point = point;
    }

    setLocation(location: [number, number] | null) {
        this.location = location;
    }
}