"use client";

import { BoundingBox, HTMLMotionProps, motion } from "motion/react";

import { ReactNode, useCallback, useState } from "react";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ScrollArea {
    export type Props = HTMLMotionProps<"div"> & {
        delta?: number;
        children?: ReactNode;
    };
}

export const ScrollArea = ({
    delta = 0,
    className,
    children,
    ...props
}: ScrollArea.Props) => {
    const [dragBounds, setDragBounds] = useState<BoundingBox | undefined>(undefined);
    const refHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;

        const { scrollHeight, clientHeight } = element;

        const offset = clientHeight - scrollHeight;

        if(offset >= 0) return;

        setDragBounds({
            top: offset + delta,
            bottom: 0,
            left: 0,
            right: 0,
        });
    }, [delta]);

    const isDraggable = !!dragBounds;

    return (
        <motion.div
            ref={refHandler}
            className={cx(
                styles.scroll__root,
                !isDraggable && className,
            )}
        >
            {
                isDraggable ? (
                    <motion.div
                        drag={"y"}
                        dragElastic={0.3}
                        dragDirectionLock
                        dragConstraints={dragBounds}
                        className={className}
                        {...props}
                    >
                        { children }
                    </motion.div>
                ) : children
            }
        </motion.div>
    );
};