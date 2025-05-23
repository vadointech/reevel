import { action, makeObservable, observable } from "mobx";
import { BasePoint, Point } from "./types";
import { ObjectUnique } from "@/utils/object-unique";
import { IMapProvider } from "./providers/types";

type MapStoreOptions = {
    points?: Point<BasePoint>[];
    getPoints: () => Point<BasePoint>[];
};

export class MapStore {
    points: Point<BasePoint>[] = [];
    pointsHidden: boolean = false;
    selectedPoint: string | null = null;

    constructor(
        private readonly provider: IMapProvider,
        options?: MapStoreOptions,
    ) {
        makeObservable(this, {
            points: observable,
            pointsHidden: observable,
            selectedPoint: observable,

            selectPoint: action,
            setPoints: action,
            appendPoints: action,
            replacePoints: action,
        });

        if(options?.points) {
            this.points = options.points;
        }
    }

    selectPoint(pointId: string | null) {
        if(pointId === this.selectedPoint) {
            this.selectedPoint = null;
        } else {
            this.selectedPoint = pointId;
        }
    }

    setPoints(points: Point<BasePoint>[]) {
        this.points = points;
    }

    appendPoints(point: Point<BasePoint>[]) {
        this.points = [
            ... new ObjectUnique(
                [
                    ...this.points,
                    ...point,
                ], "id",
            ),
        ];
    }

    /**
     * Replaces the current points with a new set of points, optionally delaying the process for a specified duration.
     *
     * @param {Point<BasePoint>[]} points - The new array of points to replace the current points.
     * @param {number} [duration=400] - The duration in milliseconds to delay the replacement.
     * Make sure duration is equal animation duration of the markers itself
     * @return {Promise<void>} A promise that resolves after the points have been replaced and the specified delay has elapsed.
     */
    replacePoints(points: Point<BasePoint>[], duration: number = 500): Promise<void> {
        this.pointsHidden = true;
        return new Promise((resolve) => setTimeout(() => {
            this.points = points;
            this.pointsHidden = false;
            resolve(undefined);
        }, duration));
    }
}