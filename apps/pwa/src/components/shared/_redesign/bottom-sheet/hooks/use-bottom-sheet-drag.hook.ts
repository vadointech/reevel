import { useEffect } from "react";
import { PanInfo, useAnimation, useMotionValue, useTransform } from "motion/react";

import { useBottomSheetStore } from "../store";
import { BottomSheetSnapPointControl } from "../snap-controls";
import { generateBottomSheetTransitionParams } from "../config/transition.config";
import { normalize } from "@/utils/normalize";

export function useBottomSheetDrag(
    snapControls: BottomSheetSnapPointControl,
) {
    const bottomSheetStore = useBottomSheetStore();
    const animate = useAnimation();

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

        if (velocity > 0 && isAtBottom) {
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

        animate.start({
            y: snapControls.getSnapPoint(snapIndex),
        }, generateBottomSheetTransitionParams(
            snapControls.getSnapPointRatio(currentSnapPointIndex),
            snapControls.getSnapPointRatio(snapIndex),
        ));

    };

    const handleOpen = () => {
        let y;

        if(bottomSheetStore.rootConfig.fitContent) {
            y = snapControls.clientHeight - bottomSheetStore.contentHeight;
        } else {
            y =  snapControls.getSnapPoint(bottomSheetStore.activeSnapPoint);
        }

        animate.start({
            y,
        }, generateBottomSheetTransitionParams(
            0,
            snapControls.getSnapPointRatio(0),
        ));
    };

    useEffect(() => {
        if(bottomSheetStore.open) {
            handleOpen();
        }
    }, [bottomSheetStore.open]);

    return {
        dragY,
        dragYProgress,
        animate,
        contentOpacity,
        handleDragEnd,
    };
}