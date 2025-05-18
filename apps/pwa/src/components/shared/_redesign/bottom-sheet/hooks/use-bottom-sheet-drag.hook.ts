import { PanInfo, useMotionValue, useTransform } from "motion/react";

import { useBottomSheetStore } from "../store";
import { BottomSheetSnapPointControl } from "../snap-controls";
import { normalize } from "@/utils/normalize";
import { useBottomSheetPosition } from "./use-bottom-sheet-position.hook";

export function useBottomSheetDrag(
    snapControls: BottomSheetSnapPointControl,
) {
    const bottomSheetStore = useBottomSheetStore();
    const positionControls = useBottomSheetPosition(snapControls);

    const dragY = useMotionValue(0);
    const dragYProgress = useTransform(
        dragY,
        (val) => {
            if(val === 0) return 0;
            return normalize(snapControls.clientHeight, snapControls.Top, val);
        },
    );
    const contentOpacity = useTransform(
        dragY,
        [
            snapControls.clientHeight,
            snapControls.clientHeight - 100,
        ],
        [0, 1],
    );

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) return;

        const velocity = info.velocity.y;
        const position = info.offset.y;

        const currentSnapPointIndex = bottomSheetStore.activeSnapPoint;
        const lastSnapPointIndex = snapControls.snapPointsCount - 1;
        const isAtBottom = currentSnapPointIndex === lastSnapPointIndex;

        if (velocity >= 30 && isAtBottom) {
            if(bottomSheetStore.rootConfig.dismissible) {
                bottomSheetStore.setClose();
            }
            return;
        }

        if(bottomSheetStore.rootConfig.fitContent) return;

        const snapIndex = snapControls.determineSnapPointIndex(
            currentSnapPointIndex,
            velocity,
            position,
        );

        bottomSheetStore.setActiveSnapPoint(snapIndex);
        positionControls.setPositionBySnapIndex(snapIndex);
    };

    // useEffect(() => {
    //     if(bottomSheetStore.open) {
    //         if(bottomSheetStore.rootConfig.fitContent) {
    //             setPositionByPx(bottomSheetStore.contentPosition);
    //         } else {
    //             setPositionBySnapIndex(bottomSheetStore.activeSnapPoint);
    //         }
    //     }
    // }, [bottomSheetStore.open]);

    return {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,

        positionControls,
    };
}