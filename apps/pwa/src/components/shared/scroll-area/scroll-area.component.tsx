"use client";

import { BoundingBox, HTMLMotionProps, motion } from "motion/react";

import { ComponentProps, useCallback, useState } from "react";

import styles from "./styles.module.scss";

export namespace ScrollArea {
    export type Props = HTMLMotionProps<"div"> & {
        delta?: number;
    };
}

export const ScrollArea = ({ delta = 0, ...props }: ScrollArea.Props) => {
    const [scrollAreaDragBounds, setScrollAreaDragBounds] = useState<Partial<BoundingBox> | null>(null);
    const containerRefHandler = useCallback((element: HTMLDivElement | null) => {
        if(!element) return;

        const { scrollHeight, clientHeight } = element;

        const offset = clientHeight - scrollHeight;

        if(offset >= 0) return;

        setScrollAreaDragBounds({
            top: offset + delta,
            bottom: 0,
        });
    }, []);
    return (
        <div
            ref={containerRefHandler}
            className={styles.scroll}
        >
            {
                scrollAreaDragBounds === null ? (
                    <div {...props as ComponentProps<"div">} />
                ) : (
                    <motion.div
                        drag={"y"}
                        dragDirectionLock
                        dragConstraints={scrollAreaDragBounds}
                        {...props}
                    />
                )
            }
        </div>
    );
};
