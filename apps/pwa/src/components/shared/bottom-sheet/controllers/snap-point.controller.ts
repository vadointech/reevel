import {
    BottomSheetSnapPoint,
    IBottomSheetInternalConfig,
    BottomSheetSnapFactorParams,
    IBottomSheetSnapPointController,
} from "../types";

export class BottomSheetSnapPointController implements IBottomSheetSnapPointController {
    readonly snapPointsArrPx: number[];

    constructor(
        private readonly config: IBottomSheetInternalConfig,
    ) {
        /**
         * Order is important (ASC)
         */
        this.snapPointsArrPx = config.snapPoints
            .map(ratio =>
                BottomSheetSnapPointController.getSnapPointValuePxByRatio(
                    ratio,
                    config.clientHeight,
                    config.contentHeight,
                    config.clientHeight,
                ),
            )
            .sort((a, b) => a - b);
    }

    get boundTop(): number {
        return this.snapPointsArrPx[0];
    }

    get boundBottom(): number {
        return this.snapPointsArrPx[this.config.snapPointsCount - 1] || this.snapPointsArrPx[0];
    }

    getPositionPxByIndex(index: number): number {
        return this.snapPointsArrPx[index] || this.boundTop;
    }

    static getSnapPointValuePxByRatio(
        ratio: BottomSheetSnapPoint,
        clientHeight: number,
        contentHeight: number,
        fallbackPx: number,
    ): number {
        if(ratio === "fit-content") return contentHeight;

        if(typeof ratio === "number") {
            if(ratio < 0 || ratio > 1) {
                return fallbackPx;
            }
            return clientHeight - (clientHeight * ratio);
        }

        const pxValue = parseInt(ratio, 10);
        return isNaN(pxValue) ? fallbackPx : clientHeight - pxValue;
    }

    determineSnapPointIndex(
        activeSnapPointIndex: number,
        velocity: number,
        offset: number,
        params?: BottomSheetSnapFactorParams,
    ): number {
        const snapVelocityThreshold = params?.snapVelocityThreshold || 150;
        const dragThreshold = 30;

        // --- 1.Queek swiper
        if (Math.abs(velocity) > snapVelocityThreshold) {
            return velocity > 0
                ? Math.min(activeSnapPointIndex + 1, this.config.snapPointsCount - 1)
                : Math.max(activeSnapPointIndex - 1, 0);
        }

        // --- 2. Decent drag
        if (Math.abs(offset) > dragThreshold) {
            return offset > 0
                ? Math.min(activeSnapPointIndex + 1, this.config.snapPointsCount - 1)
                : Math.max(activeSnapPointIndex - 1, 0);
        }

        return activeSnapPointIndex;
    }
}