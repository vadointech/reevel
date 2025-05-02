"use client";

import { snapPoints, SnapPoints } from "./config";

class SnapPointControl {
    readonly clientHeight: number;
    readonly snapPointsArray: number[];
    readonly snapPointsCount: number;

    readonly Low: number;
    readonly High: number;
    readonly Medium: number;

    constructor(
        private readonly snapPointsMap: Map<SnapPoints, number>,
    ) {
        this.clientHeight = window?.innerHeight || 0;

        /**
         * Order is important (DESC)
         */
        const snapPointsArray =
          Array.from(this.snapPointsMap.values())
              .sort((a, b) => b - a);

        this.snapPointsArray = snapPointsArray;
        this.snapPointsCount = snapPointsArray.length;

        this.Low = this.getSnapPointValue(SnapPoints.Low);
        this.High = this.getSnapPointValue(SnapPoints.High);
        this.Medium = this.getSnapPointValue(SnapPoints.Medium);
    }

    getSnapPointValue(snap: SnapPoints | number): number {
        const ratio =
          typeof snap === "number"
              ? this.snapPointsArray[snap]
              : this.snapPointsMap.get(snap);

        if (ratio == null) {
            throw new Error(`Invalid snap: ${snap}`);
        }

        return this.clientHeight - this.clientHeight * ratio;
    }
}

export const snapControls = new SnapPointControl(snapPoints);