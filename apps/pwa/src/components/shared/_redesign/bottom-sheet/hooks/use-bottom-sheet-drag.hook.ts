import { PanInfo, useMotionValue, useTransform } from "motion/react";

import { useBottomSheetStore } from "../store";
import { normalize } from "@/utils/normalize";
import { RefObject } from "react";
import { BottomSheetSnapPointControl, BottomSheetPositionControls } from "../controls";

export function useBottomSheetDrag(
    snapControls: RefObject<BottomSheetSnapPointControl>,
    positionControls: RefObject<BottomSheetPositionControls>,
) {
    const bottomSheetStore = useBottomSheetStore();

    const dragY = useMotionValue(0);
    const dragYProgress = useTransform(
        dragY,
        (val) => {
            if(val === 0) return 0;
            return normalize(snapControls.current.clientHeight, snapControls.current.Top, val);
        },
    );
    const contentOpacity = useTransform(
        dragY,
        [
            snapControls.current.clientHeight,
            snapControls.current.clientHeight - 100,
        ],
        [0, 1],
    );

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) return;

        const velocity = info.velocity.y;
        const position = info.offset.y;

        const currentSnapPointIndex = bottomSheetStore.activeSnapPoint;
        const lastSnapPointIndex = snapControls.current.snapPointsCount - 1;
        const isAtBottom = currentSnapPointIndex === lastSnapPointIndex;

        if (velocity >= 30 && isAtBottom) {
            if(bottomSheetStore.rootConfig.dismissible) {
                bottomSheetStore.setClose();
            }
            return;
        }

        const snapIndex = snapControls.current.determineSnapPointIndex(
            currentSnapPointIndex,
            velocity,
            position,
        );

        bottomSheetStore.setActiveSnapPoint(snapIndex);
        positionControls.current.setPositionBySnapIndex(snapIndex);
    };

    return {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
    };
}