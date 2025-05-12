"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { useBottomSheetDrag } from "../hooks";
import { generateBottomSheetExitTransitionParams } from "../config/transition.config";
import { useBottomSheetStore } from "../store";
import { useOutsideEvent } from "@/hooks/use-outside-event";

import { BottomSheetOverlay } from "./overlay.component";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetContent {
    export type Props = HTMLMotionProps<"div">;
}

export const BottomSheetContent = ({
    style,
    className,
    ...props
}: BottomSheetContent.Props) => {
    const bottomSheetStore = useBottomSheetStore();

    const snapControls = bottomSheetStore.snapControls;
    
    const {
        dragY,
        dragYProgress,

        animate,
        contentOpacity,
        handleDragEnd,
    } = useBottomSheetDrag(snapControls);


    const [bottomSheetRef] = useOutsideEvent<HTMLDivElement>(
        ["pointerdown"], {
            activate: bottomSheetStore.rootConfig.dismissible,
            handleEvent: () => {
                bottomSheetStore.setClose();
            },
        },
    );

    return (
        <>
            {
                bottomSheetStore.rootConfig.overlay && (
                    <BottomSheetOverlay
                        dragYProgress={dragYProgress}
                        threshold={bottomSheetStore.rootConfig.fadeThreshold}
                    />
                )
            }
            <motion.div
                drag={"y"}
                style={{ y: dragY }}
                ref={bottomSheetRef}
                transition={generateBottomSheetExitTransitionParams(
                    snapControls.getSnapPointRatio(snapControls.snapPointsCount - 1),
                )}
                initial={{ y: snapControls.clientHeight }}
                exit={{ y: snapControls.clientHeight }}
                animate={animate}
                dragDirectionLock
                dragConstraints={{
                    top: snapControls.Top,
                    bottom: snapControls.Bottom,
                }}
                dragElastic={{
                    top: .07,
                    bottom: 0,
                }}
                onDragEnd={handleDragEnd}
                className={styles.bottomSheet__body}
            >
                <motion.div
                    style={{ opacity: contentOpacity, ...style }}
                    className={cx(styles.bottomSheet__content, className)}
                    {...props}
                />
            </motion.div>
        </>
    );
};
