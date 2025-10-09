import { ComponentProps } from "react";
import { HTMLMotionProps, motion } from "motion/react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace SearchScreenContent {
    export type Props = ComponentProps<"div">;
}

export const SearchScreenContent = ({
    className,
    ...props
}: SearchScreenContent.Props) => {
    return (
        <div className={cx(styles.search__content, className)} {...props} />
    );
};


export const SearchScreenMotionContent = ({
    className,
    ...props
}: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cx(styles.search__content, className)}
            {...props}
        />
    );
};

export const SearchScreenMotionListContent = ({
    className,
    ...props
}: HTMLMotionProps<"div">) => {
    return (
        <motion.div
            key={"results"}
            initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
                filter: "blur(6px)",
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                },
            }}
            exit={{
                opacity: 0,
                scale: 0.95,
                y: -10,
                filter: "blur(4px)",
            }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cx(
                styles.search__content,
                styles.search__content_overlay,
                className,
            )}
            {...props}
        />
    );
};