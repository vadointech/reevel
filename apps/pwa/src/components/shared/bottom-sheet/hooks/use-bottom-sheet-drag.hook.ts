import { PanInfo, useMotionValue, useTransform } from "motion/react";

import { normalize } from "@/utils/normalize";
import { useBottomSheet } from "@/components/shared/bottom-sheet/bottom-sheet.context";

export function useBottomSheetDrag(
) {
    const { controller } = useBottomSheet();

    const dragY = useMotionValue(0);
    const dragYProgress = useTransform(
        dragY,
        (val) => {
            if(val === 0) return 0;
            return normalize(controller.current.internalConfig.clientHeight, controller.current.dragConstraints.top, val);
        },
    );
    const contentOpacity = useTransform(
        dragY,
        [
            controller.current.internalConfig.clientHeight,
            controller.current.internalConfig.clientHeight - 100,
        ],
        [0, 1],
    );

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) return;
        controller.current.drag(info);
    };

    return {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
    };
}