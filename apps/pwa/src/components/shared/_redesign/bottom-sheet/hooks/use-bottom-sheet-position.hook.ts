import { RefObject, useRef } from "react";
import { AnimationControls, useAnimation } from "motion/react";
import { generateBottomSheetTransitionParams } from "../config/transition.config";
import { BottomSheetSnapPointControl } from "../snap-controls";

export type PositionControls = {
    animate: AnimationControls;
    positionPx: RefObject<number>;
    setPositionByPx: (value: number) => void;
    setPositionBySnapIndex: (value: number) => void;
    setPositionByRatio: (value: number) => void;
};

export function useBottomSheetPosition(
    snapControls: BottomSheetSnapPointControl,
): PositionControls {
    const animate = useAnimation();
    const positionPx = useRef(0);

    function getTransitionParams(px: number) {
        const params = generateBottomSheetTransitionParams(
            snapControls.getSnapPointRatioByPx(positionPx.current),
            snapControls.getSnapPointRatioByPx(px),
        );

        positionPx.current = px;

        return params;
    }

    const setPositionBySnapIndex = (index: number) => {
        const y = snapControls.getSnapPoint(index);
        animate.start({ y }, getTransitionParams(y));
    };

    const setPositionByRatio = (ratio: number) => {
        const y = snapControls.getSnapPointValuePx(ratio);
        animate.start({ y }, getTransitionParams(y));
    };

    const setPositionByPx = (px: number) => {
        animate.start({ y: px }, getTransitionParams(px));
    };

    return {
        animate,
        positionPx,
        setPositionByPx,
        setPositionBySnapIndex,
        setPositionByRatio,
    };
}