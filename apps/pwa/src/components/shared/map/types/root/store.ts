import { BasePoint, Point } from "../point/point";

export interface IMapStore {
    isViewStateSynced: boolean;
    /**
     * An array of points that are displayed on the map.
     */
    points: Point<BasePoint>[];
    pointsRef: Point<BasePoint>[];
    /**
     * A boolean variable that determines the visibility of ALL points on a map.
     * When set to true, the points are visible; when set to false, the points are hidden.
     */
    pointsVisible: boolean;
    /**
     * The identifier of the currently selected point.
     */
    selectedPoint: string | null;

    setViewStateSynced(synced: boolean): void;
    setPoints(points: Point<BasePoint>[]): void;
    setPointsVisible(visible: boolean): void;
    setSelectedPoint(pointId: string | null): void;
}