"use client";

import { IBottomSheetRootConfig } from "../config/root.config";

export type BottomSheetSnapPoint = number | "fit-content";

export class BottomSheetSnapPointControl {
    readonly snapPointsArrPx: number[];
    readonly snapPointsCount: number;

    constructor(
        private readonly rootConfig: IBottomSheetRootConfig,
        readonly contentHeight: number,
        readonly clientHeight: number,
    ) {
        this.snapPointsCount = rootConfig.snapPoints.length;

        /**
         * Order is important (ASC)
         */
        this.snapPointsArrPx = this.rootConfig.snapPoints
            .map(ratio => this.getSnapPointValuePxByRation(ratio))
            .sort((a, b) => a - b);
    }

    get Top(): number {
        return this.snapPointsArrPx[0];
    }

    get Bottom(): number {
        return this.snapPointsArrPx[this.snapPointsCount - 1] || this.snapPointsArrPx[0];
    }

    getSnapPointValuePxByIndex(index: number): number {
        return this.snapPointsArrPx[index] || this.Top;
    }

    getSnapPointValuePxByRation(ratio: BottomSheetSnapPoint): number {
        if(ratio === "fit-content") return this.contentHeight;

        if (ratio === undefined || ratio < 0 || ratio > 1) {
            return this.Top;
        }
        return this.clientHeight - this.clientHeight * ratio;
    }

    getSnapPointRatioByValuePx(px: number): number {
        return 1 - px / this.clientHeight;
    }

    determineSnapPointIndex(
        activeSnapPointIndex: number,
        velocity: number,
        offset: number,
        snapVelocityThreshold = 100,
        slowSwipeThreshold = 10,
        hysteresisFactor = 0.1,
        attractionDistanceFactor = 0.2,
    ): number {
        const currentSnapY = this.snapPointsArrPx[activeSnapPointIndex] ?? 0;
        const predictedY = currentSnapY + offset;

        if (Math.abs(velocity) > snapVelocityThreshold) {
            return velocity > 0
                ? Math.min(activeSnapPointIndex + 1, this.snapPointsCount - 1)
                : Math.max(activeSnapPointIndex - 1, 0);
        }

        if (Math.abs(velocity) > slowSwipeThreshold) {
            const delta = predictedY - currentSnapY;
            if (delta > 10 && velocity > 0) {
                return Math.min(activeSnapPointIndex + 1, this.snapPointsCount - 1);
            } else if (delta < -10 && velocity < 0) {
                return Math.max(activeSnapPointIndex - 1, 0);
            }
        }

        let closestIndex = activeSnapPointIndex;
        let minDistance = Infinity;

        for (let i = 0; i < this.snapPointsCount; i++) {
            const distance = Math.abs(this.snapPointsArrPx[i] - predictedY);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        const distanceToClosest = Math.abs(this.snapPointsArrPx[closestIndex] - predictedY);
        const distanceToCurrent = Math.abs(this.snapPointsArrPx[activeSnapPointIndex] - predictedY);

        const dir = predictedY > this.snapPointsArrPx[activeSnapPointIndex] ? 1 : -1;
        const neighborIndex = Math.min(Math.max(closestIndex + dir, 0), this.snapPointsCount - 1);
        const normalizedHysteresis = Math.abs(this.snapPointsArrPx[neighborIndex] - this.snapPointsArrPx[activeSnapPointIndex]) * hysteresisFactor;

        if (distanceToClosest < distanceToCurrent - normalizedHysteresis) {
            return closestIndex;
        }

        if (distanceToClosest < Math.abs(this.snapPointsArrPx[closestIndex] - this.snapPointsArrPx[activeSnapPointIndex]) * attractionDistanceFactor) {
            return closestIndex;
        }

        return activeSnapPointIndex;
    }
}