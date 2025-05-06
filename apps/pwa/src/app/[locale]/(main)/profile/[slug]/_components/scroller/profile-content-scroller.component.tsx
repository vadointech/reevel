"use client";

import { ComponentProps, useRef } from "react";
import { motion, useAnimation } from "motion/react";

import { useProfileScrollerSnap } from "./use-scroller-snap";
import { profileContentDragYPx } from "../motion-values";

import styles from "./styles.module.scss";

export namespace ProfileContentScroller {
    export type Props = ComponentProps<"div">;
}

export const ProfileContentScroller = ({ children, ...props }: ProfileContentScroller.Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const animate = useAnimation();

    const { handleDragEnd } = useProfileScrollerSnap(animate);

    return (
        <div ref={scrollerRef} className={styles.scroller}>
            <motion.div

                drag={"y"}
                style={{ y: profileContentDragYPx }}
                animate={animate}
                dragDirectionLock
                onDragEnd={handleDragEnd}
                dragConstraints={scrollerRef}
            >
                { children }
            </motion.div>
        </div>
    );
};
