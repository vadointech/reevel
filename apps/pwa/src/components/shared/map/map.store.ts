import { action, makeObservable, observable } from "mobx";
import { BasePoint, Point, IMapStore } from "./types";

export class MapStore implements IMapStore {
    isViewStateSynced: boolean = false;
  
    points: Point<BasePoint>[] = [];
    pointsVisible: boolean = true;
    selectedPoint: string | null = null;

    constructor() {
        makeObservable(this, {
            points: observable,
            pointsVisible: observable,
            selectedPoint: observable,

            setPoints: action,
            setPointsVisible: action,
            setSelectedPoint: action,
        });
    }

    setViewStateSynced(state: boolean) {
        this.isViewStateSynced = state;
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