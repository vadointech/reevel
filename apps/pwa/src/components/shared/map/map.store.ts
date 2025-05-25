import { action, makeObservable, observable, reaction } from "mobx";
import { BasePoint, Point, IMapStore } from "./types";

export class MapStore implements IMapStore {
    initialized: boolean = false;

    points: Point<BasePoint>[] = [];
    pointsVisible: boolean = true;
    selectedPoint: string | null = null;

    constructor() {
        makeObservable(this, {
            initialized: observable,

            points: observable,
            pointsVisible: observable,
            selectedPoint: observable,

            setInitialized: action,

            setPoints: action,
            setPointsVisible: action,
            setSelectedPoint: action,
        });
    }

    setInitialized(initialized: boolean) {
        this.initialized = initialized;
    }

    setPoints(points: Point<BasePoint>[]) {
        this.points = points;
    }

    setPointsVisible(visible: boolean) {
        this.pointsVisible = visible;
    }

    setSelectedPoint(pointId: string | null) {
        this.selectedPoint = pointId;
    }
}