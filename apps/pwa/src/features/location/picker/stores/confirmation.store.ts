import { action, makeObservable, observable } from "mobx";
import { IconPoint, Point } from "@/components/shared/map/types";

export class LocationPickerConfirmationStore {
    point: Point<IconPoint> | null = null;

    constructor() {
        makeObservable(this, {
            point: observable,
            setPoint: action,
        });
    }

    setPoint(point: Point<IconPoint> | null) {
        this.point = point;
    }
}