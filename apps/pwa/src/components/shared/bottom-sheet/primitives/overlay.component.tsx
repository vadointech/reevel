"use client";

import { HTMLMotionProps, motion, useTransform } from "motion/react";
import { MotionValue } from "motion";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetOverlay {
    export type Props = HTMLMotionProps<"div"> & {
        dragYProgress: MotionValue<number>;
        threshold: number;
        zIndex: number;
    };
}

export const BottomSheetOverlay = ({
    dragYProgress,
    threshold,
    zIndex,
    className,
    ...props
}: BottomSheetOverlay.Props) => {
    const overlayOpacity = useTransform(
        dragYProgress,
        [0, threshold, 1],
        [0, 0, 1],
    );

    return (
        <motion.div
            style={{ opacity: overlayOpacity, zIndex }}
            className={cx(
                styles.bottomSheet__overlay,
                className,
            )}
            {...props}
        />
    );
};
