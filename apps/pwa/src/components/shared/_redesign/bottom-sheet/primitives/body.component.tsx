"use client";

import { HTMLMotionProps, motion } from "motion/react";
import { useBottomSheetContainer, useBottomSheetDrag } from "../hooks";
import { generateBottomSheetExitTransitionParams } from "../config/transition.config";
import { useBottomSheetStore } from "../store";
import { useOutsideEvent } from "@/hooks/use-outside-event";

import { BottomSheetOverlay } from "./overlay.component";

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

    const snapControls = bottomSheetStore.snapControls;
    const rootConfig = bottomSheetStore.rootConfig;

    const {
        dragY,
        dragYProgress,

        animate,
        contentOpacity,
        handleDragEnd,
    } = useBottomSheetDrag(snapControls);

    const [bodyRef, body] = useBottomSheetContainer();

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
                transition={generateBottomSheetExitTransitionParams(
                    snapControls.getSnapPointRatio(snapControls.snapPointsCount - 1),
                )}
                initial={{ y: snapControls.clientHeight }}
                exit={{ y: snapControls.clientHeight }}
                animate={animate}
                dragDirectionLock
                dragConstraints={body.dragBounds}
                dragElastic={{
                    top: .07,
                    bottom: snapControls.snapPointsCount === 1 ? .2 : .07,
                }}
                onDragEnd={handleDragEnd}
                className={styles.bottomSheet__dragger}
            >
                <motion.div
                    ref={bodyRef}
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
