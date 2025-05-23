"use client";

import { useEffect } from "react";
import { HTMLMotionProps, motion } from "motion/react";

import {
    useBottomSheetControls,
    useBottomSheetDrag,
} from "../hooks";
import { generateBottomSheetExitTransitionParams } from "../config/transition.config";
import { useBottomSheetStore } from "../store";
import { BottomSheetOverlay } from "./overlay.component";

import { useOutsideEvent } from "@/hooks/use-outside-event";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetBody {
    export type Props = HTMLMotionProps<"div">;
}

export const BottomSheetBody = ({
    style,
    className,
    ...props
}: BottomSheetBody.Props) => {
    const bottomSheetStore = useBottomSheetStore();
    const { rootConfig } = bottomSheetStore;

    const {
        initialized,

        containerRef,
        snapControls,
        positionControls,

        containerAnimate,
    } = useBottomSheetControls(bottomSheetStore, rootConfig);

    const {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
    } = useBottomSheetDrag(
        snapControls,
        positionControls,
    );

    useEffect(() => {
        if(initialized && bottomSheetStore.open) {
            positionControls.current.setPositionBySnapIndex(rootConfig.defaultSnapPointIndex);
        }
    }, [initialized]);

    const [bottomSheetRef] = useOutsideEvent<HTMLDivElement>(
        ["pointerdown"], {
            activate: rootConfig.dismissible,
            handleEvent: () => {
                bottomSheetStore.setClose();
            },
        },
    );

    return (
        <>
            {
                rootConfig.overlay && (
                    <BottomSheetOverlay
                        dragYProgress={dragYProgress}
                        threshold={rootConfig.fadeThreshold}
                    />
                )
            }
            <motion.div
                drag={"y"}
                style={{
                    y: dragY,
                    height: "100%",
                }}
                ref={bottomSheetRef}
                dragControls={bottomSheetStore.dragControls}
                dragListener={!rootConfig.handleOnly}
                transition={generateBottomSheetExitTransitionParams(0)}
                initial={{ y: snapControls.current.clientHeight }}
                exit={{ y: snapControls.current.clientHeight }}
                animate={containerAnimate}
                dragDirectionLock
                dragConstraints={{
                    top: snapControls.current.Top,
                    bottom: snapControls.current.Bottom,
                }}
                dragElastic={{
                    top: .07,
                    bottom: snapControls.current.snapPointsCount === 1 ? .2 : .07,
                }}
                onDragEnd={handleDragEnd}
                className={styles.bottomSheet__dragger}
            >
                <motion.div
                    ref={containerRef}
                    style={{
                        opacity: contentOpacity,
                        ...style,
                    }}
                    className={cx(
                        styles.bottomSheet__body,
                        className,
                    )}
                    {...props}
                />
            </motion.div>
        </>
    );
};
