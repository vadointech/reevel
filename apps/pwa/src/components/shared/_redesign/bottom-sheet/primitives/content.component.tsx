"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { useBottomSheetContainer, useBottomSheetDrag } from "../hooks";
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
    const rootConfig = bottomSheetStore.rootConfig;

    const {
        dragY,
        dragYProgress,

        animate,
        contentOpacity,
        handleDragEnd,
    } = useBottomSheetDrag(snapControls);

    const [contentRef, content] = useBottomSheetContainer();

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
                    height: rootConfig.fitContent ? "fit-content" : "100%",
                }}
                ref={bottomSheetRef}
                dragControls={bottomSheetStore.dragControls}
                dragListener={!rootConfig.handleOnly}
                transition={generateBottomSheetExitTransitionParams(
                    snapControls.getSnapPointRatio(snapControls.snapPointsCount - 1),
                )}
                initial={{ y: snapControls.clientHeight }}
                exit={{ y: snapControls.clientHeight }}
                animate={animate}
                dragDirectionLock
                dragConstraints={content.dragBounds}
                dragElastic={{
                    top: .07,
                    bottom: snapControls.snapPointsCount === 1 ? .2 : .07,
                }}
                onDragEnd={handleDragEnd}
                className={styles.bottomSheet__body}
            >
                <motion.div
                    ref={contentRef}
                    style={{
                        opacity: contentOpacity,
                        paddingBottom: snapControls.Top,
                        ...style,
                    }}
                    className={cx(styles.bottomSheet__content, className)}
                    {...props}
                />
            </motion.div>
        </>
    );
};
