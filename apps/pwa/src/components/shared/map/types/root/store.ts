import { BasePoint, Point } from "./point";

export interface IMapStore {
    initialized: boolean;

    points: Point<BasePoint>[];
    pointsVisible: boolean;
    selectedPoint: string | null;

    setInitialized(initialized: boolean): void;

    setPoints(points: Point<BasePoint>[]): void;
    setPointsVisible(visible: boolean): void;
    setSelectedPoint(pointId: string | null): void;
}