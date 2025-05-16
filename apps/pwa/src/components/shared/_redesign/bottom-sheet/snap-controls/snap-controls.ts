"use client";

import { IBottomSheetRootConfig } from "../config/root.config";

export class BottomSheetSnapPointControl {
    readonly snapPoints: number[];
    readonly snapPointsArr: number[];
    readonly snapPointsCount: number;

    constructor(
        private readonly rootConfig: IBottomSheetRootConfig,
        readonly clientHeight: number,
    ) {
        this.snapPointsCount = rootConfig.snapPoints.length;

        /**
         * Order is important (DESC)
         */
        this.snapPoints = rootConfig.snapPoints
            .sort((a, b) => b - a);

        this.snapPointsArr = this.snapPoints
            .map(ratio => this.getSnapPointValuePx(ratio));
    }

    get Top(): number {
        return this.snapPointsArr[0];
    }

    get Bottom(): number {
        return this.snapPointsArr[this.snapPointsArr.length - 1] || this.snapPointsArr[0];
    }

    getSnapPoint(index: number): number {
        return this.snapPointsArr[index] || this.Top;
    }

    getSnapPointRatio(index: number): number {
        return this.snapPoints[index] || 0;
    }

    getSnapPointValuePx(ratio: number): number {
        if (ratio === undefined || ratio < 0 || ratio > 1) {
            return this.Top;
        }
        return this.clientHeight - this.clientHeight * ratio;
    }

    get p() {
        return this.clientHeight;
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
        const currentSnapY = this.snapPointsArr[activeSnapPointIndex] ?? 0;
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

        // Знайти найближчу snap-точку до predictedY
        let closestIndex = activeSnapPointIndex;
        let minDistance = Infinity;

        for (let i = 0; i < this.snapPointsCount; i++) {
            const distance = Math.abs(this.snapPointsArr[i] - predictedY);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        const distanceToClosest = Math.abs(this.snapPointsArr[closestIndex] - predictedY);
        const distanceToCurrent = Math.abs(this.snapPointsArr[activeSnapPointIndex] - predictedY);

        const dir = predictedY > this.snapPointsArr[activeSnapPointIndex] ? 1 : -1;
        const neighborIndex = Math.min(Math.max(closestIndex + dir, 0), this.snapPointsCount - 1);
        const normalizedHysteresis = Math.abs(this.snapPointsArr[neighborIndex] - this.snapPointsArr[activeSnapPointIndex]) * hysteresisFactor;

        if (distanceToClosest < distanceToCurrent - normalizedHysteresis) {
            return closestIndex;
        }

        if (distanceToClosest < Math.abs(this.snapPointsArr[closestIndex] - this.snapPointsArr[activeSnapPointIndex]) * attractionDistanceFactor) {
            return closestIndex;
        }

        return activeSnapPointIndex;
    }
}