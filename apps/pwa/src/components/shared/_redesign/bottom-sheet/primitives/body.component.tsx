"use client";

import { useCallback, useEffect, useState } from "react";
import { HTMLMotionProps, motion } from "motion/react";

import { useOutsideEvent } from "@/hooks/use-outside-event";
import { useBottomSheet } from "../bottom-sheet.context";
import { useBottomSheetDrag } from "../hooks";
import {
    generateBottomSheetTransitionParams,
} from "../config/transition.config";

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
    const { controller, store } = useBottomSheet();

    const [ready, setReady] = useState(false);

    const containerRef = useCallback((element: HTMLElement | null) => {
        controller.current.attach(element);
        setReady(true);
    }, [controller]);

    const {
        dragY,
        dragYProgress,
        contentOpacity,
        handleDragEnd,
    } = useBottomSheetDrag();

    useEffect(() => {
        if(ready && store.open) {
            controller.current.open();
        }
    }, [ready]);

    const [bottomSheetRef] = useOutsideEvent<HTMLDivElement>(
        ["pointerdown"], {
            activate: controller.current.internalConfig.dismissible,
            handleEvent: () => {
                controller.current.close();
            },
        },
    );

    return (
        <>
            {
                controller.current.internalConfig.overlay && (
                    <BottomSheetOverlay
                        dragYProgress={dragYProgress}
                        threshold={controller.current.internalConfig.fadeThreshold}
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
                dragControls={controller.current.dragControls}
                dragListener={!controller.current.internalConfig.handleOnly}
                transition={generateBottomSheetTransitionParams(0)}
                initial={{ y: controller.current.internalConfig.clientHeight }}
                exit={{ y: controller.current.internalConfig.clientHeight }}
                animate={controller.current.animationControls}
                dragDirectionLock
                dragConstraints={controller.current.dragConstraints}
                dragElastic={{
                    top: .07,
                    bottom: controller.current.internalConfig.snapPointsCount === 1 ? .2 : .07,
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
