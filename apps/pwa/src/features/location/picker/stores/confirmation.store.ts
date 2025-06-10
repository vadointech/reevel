import { action, makeObservable, observable, reaction } from "mobx";
import { IconPoint, Point } from "@/components/shared/map/types";

export class LocationPickerConfirmationStore {
    point: Point<IconPoint> | null = null;

    private readonly disposeReaction?: () => void;

    constructor(
        pointInit?: Point<IconPoint>,
        syncPoint?: (point: Point<IconPoint> | null) => void,
    ) {
        makeObservable(this, {
            point: observable,
            setPoint: action,
        });

        if(pointInit) {
            this.point = pointInit;
        }

        if(syncPoint) {
            this.disposeReaction = reaction(
                () => this.point,
                (point) => {
                    syncPoint(point);
                },
            );
        }
    }

    dispose() {
        this.disposeReaction?.();
    }

    setPoint(point: Point<IconPoint> | null) {
        this.point = point;
    }
}