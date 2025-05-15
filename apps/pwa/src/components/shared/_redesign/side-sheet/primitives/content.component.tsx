"use client";

import { HTMLMotionProps, motion } from "motion/react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace SideSheetContent {
    export type Props = HTMLMotionProps<"div">;
}

export const SideSheetContent = ({
    className,
    ...props
}: SideSheetContent.Props) => {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
                type: "tween",
                ease: [0.25, 0.1, 0.25, 1],
                duration: 0.35,
            }}
            className={cx(
                styles.sideSheet__body,
                className,
            )}
            {...props}
        />
    );
};
