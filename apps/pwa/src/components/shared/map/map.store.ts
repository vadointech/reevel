import { action, makeObservable, observable } from "mobx";
import { IMapboxProvider } from "./providers/mapbox";
import { BasePoint, Point } from "./types";

type MapStoreOptions = {
    points?: Point<BasePoint>[];
};

export class MapStore {
    points: Point<BasePoint>[] = [];
    selectedPoint?: string = undefined;

    constructor(
        private readonly provider: IMapboxProvider,
        options?: MapStoreOptions,
    ) {
        makeObservable(this, {
            points: observable,
            selectedPoint: observable,
            selectPoint: action,
        });

        if(options?.points) {
            this.points = options.points;
        }
    }

    selectPoint(pointId: string | undefined) {
        if(pointId === this.selectedPoint) {
            this.selectedPoint = undefined;
        } else {
            this.selectedPoint = pointId;
        }
    }

    setPoints(points: Point<BasePoint>[]) {
        this.points = points;
    }

    appendPoint(point: Point<BasePoint>) {
        this.points.push(point);
    }
}