"use client";

import { ReactNode } from "react";
import { motion, useAnimation, useDragControls } from "motion/react";
import { snapControls } from "./snap-controls";
import { drawerDragYPx } from "./motion-values";
import { useDrawerRoot } from "./use-drawer-root";

import styles from "./styles.module.scss";

export namespace EventDrawerRoot {
    export type Props = {
        children: ReactNode
    };
}

export const EventDrawerRoot = ({ children }: EventDrawerRoot.Props) => {
    const animate = useAnimation();
    const controls = useDragControls();
    const { handleDragEnd } = useDrawerRoot(animate);

    return (
        <motion.div
            style={{
                y: drawerDragYPx,
            }}
            drag={"y"}
            animate={animate}
            dragElastic={false}
            dragControls={controls}
            initial={{ y: snapControls.High }}
            dragConstraints={{
                top: snapControls.High,
                bottom: snapControls.clientHeight - snapControls.High,
            }}
            onDragEnd={handleDragEnd}
            className={styles.drawer}
        >
            { children }
        </motion.div>
    );
};
