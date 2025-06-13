import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";

import styles from "./styles.module.scss";
import cx from "classnames";
import { PropsWithChildren } from "react";

export namespace MotionOptionsList {
    export type Props = HTMLMotionProps<"ul"> & PropsWithChildren<{
        spacingMode?: "gap" | "padding"
    }>;
}

export const MotionOptionsList = ({
    spacingMode = "gap",
    className,
    children,
    ...props
}: MotionOptionsList.Props) => {
    return (
        <motion.ul
            layout
            transition={{
                layout: { type: "spring", stiffness: 500, damping: 40 },
            }}
            className={cx(
                styles.list,
                styles[`list_spacing_${spacingMode}`],
                className,
            )}
            {...props}
        >
            <AnimatePresence mode={"popLayout"}>
                { children }
            </AnimatePresence>
        </motion.ul>
    );
};