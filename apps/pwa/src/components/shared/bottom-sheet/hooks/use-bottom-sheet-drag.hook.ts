import { PanInfo, useMotionValue, useTransform } from "motion/react";

import { useBottomSheet } from "@/components/shared/bottom-sheet/bottom-sheet.context";

export function useBottomSheetDrag() {
    const { controller } = useBottomSheet();

    const dragY = useMotionValue(0);
    const dragYProgress = useTransform(
        dragY,
        [
            controller.dragConstraints.top === controller.dragConstraints.bottom
                ? controller.internalConfig.clientHeight
                : controller.dragConstraints.bottom,
            controller.dragConstraints.top,
        ],
        [0, 1],
    );

    const contentOpacity = useTransform(
        dragY,
        [
            controller.internalConfig.clientHeight,
            controller.internalConfig.clientHeight - 100,
        ],
        [0, 1],
    );

    const handleDragEnd = (_: any, info: PanInfo) => {
        if(Math.abs(info.offset.x) > Math.abs(info.offset.y)) return;
        controller.drag(info);
    };

    const handleAnimationComplete = () => {
        controller.settleSnapPoint();
    };

    return {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
        handleAnimationComplete,
    };
}