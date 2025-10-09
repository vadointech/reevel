"use client";

import { useCallback, useEffect, useState } from "react";
import { HTMLMotionProps, motion, MotionValue } from "motion/react";

import { useOutsideEvent } from "@/hooks/use-outside-event";
import { useBottomSheet } from "../bottom-sheet.context";
import { useBottomSheetDrag } from "../hooks";
import {
    generateBottomSheetTransitionParams,
} from "../config/transition.config";

import { BottomSheetOverlay } from "./overlay.component";
import { BottomSheetDisplayMode } from "../types";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetBody {
    export type Props = HTMLMotionProps<"div"> & {
        dragYProgress?: MotionValue<number>;
    };
}

export const BottomSheetBody = ({
    style,
    className,
    dragYProgress: externalDragYProgress,
    ...props
}: BottomSheetBody.Props) => {
    const { controller, store } = useBottomSheet();

    const [ready, setReady] = useState(false);

    const containerRef = useCallback((element: HTMLElement | null) => {
        controller.attach(element);
        setReady(true);
    }, [controller]);

    const {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
        handleAnimationComplete,
    } = useBottomSheetDrag();

    useEffect(() => {
        if(!externalDragYProgress) return;

        externalDragYProgress.set(dragYProgress.get());

        const unsubscribe = dragYProgress.on("change", (latest) => {
            externalDragYProgress.set(latest);
        });

        return () => unsubscribe();
    }, [dragYProgress, externalDragYProgress]);


    useEffect(() => {
        if(ready && store.open) {
            controller.open();
        }
    }, [ready]);

    const [bottomSheetRef] = useOutsideEvent<HTMLDivElement>(
        ["pointerdown"], {
            activate: controller.internalConfig.dismissible,
            handleEvent: () => {
                controller.close();
            },
        },
    );

    const isStandalone = controller.internalConfig.displayMode === BottomSheetDisplayMode.Standalone;

    return (
        <>
            {
                controller.internalConfig.overlay && (
                    <BottomSheetOverlay
                        dragYProgress={dragYProgress}
                        zIndex={controller.internalConfig.zIndex - 1}
                        threshold={controller.internalConfig.fadeThreshold}
                    />
                )
            }
            <motion.div
                drag={"y"}
                style={{
                    y: dragY,
                    height: "100%",
                    touchAction: "none",
                    zIndex: controller.internalConfig.zIndex,
                    paddingBottom: controller.dragConstraints.top,
                }}
                dragListener={false}
                ref={bottomSheetRef}
                dragControls={controller.dragControls}
                transition={generateBottomSheetTransitionParams(0)}
                initial={{ y: controller.internalConfig.clientHeight }}
                exit={{ y: controller.internalConfig.clientHeight }}
                animate={controller.animationControls}
                dragDirectionLock
                dragConstraints={controller.dragConstraints}
                dragElastic={{
                    top: .07,
                    bottom: controller.internalConfig.snapPointsCount === 1 ? .2 : .07,
                }}
                onDragEnd={handleDragEnd}
                onAnimationComplete={handleAnimationComplete}
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
                        isStandalone && styles.bottomSheet__body_standalone,
                        className,
                    )}
                    onPointerDown={(event) => {
                        if(controller.internalConfig.dragListener) {
                            controller.dragControls.start(event);
                        }
                        event.stopPropagation();
                    }}
                    {...props}
                />
            </motion.div>
        </>
    );
};
