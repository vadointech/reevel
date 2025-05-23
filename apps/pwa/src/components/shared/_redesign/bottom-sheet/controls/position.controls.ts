import { AnimationControls } from "motion/react";
import { IBottomSheetStore } from "../store";
import { BottomSheetSnapPointControl } from "./snap-point.controls";
import { generateBottomSheetTransitionParams } from "../config/transition.config";

export class BottomSheetPositionControls {
    positionPx: number = 0;

    constructor(
        private readonly animate: AnimationControls,
        private readonly snapControls: BottomSheetSnapPointControl,
        private readonly store: IBottomSheetStore,
    ) {}

    setPositionBySnapIndex(index: number) {
        const y = this.snapControls.getSnapPointValuePxByIndex(index);
        if(y === this.positionPx) return;
        this.store.setActiveSnapPoint(index);
        this.animate.start({ y }, this.getTransitionParams(y));
    };

    private getTransitionParams(px: number) {
        const params = generateBottomSheetTransitionParams(
            this.snapControls.getSnapPointRatioByValuePx(this.positionPx),
            this.snapControls.getSnapPointRatioByValuePx(px),
        );

        this.positionPx = px;

        return params;
    }
}