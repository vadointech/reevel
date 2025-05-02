"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimation, useDragControls } from "motion/react";
import { snapControls, SnapPoints } from "./snap-controls";
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

    useEffect(() => {
        animate.start({ y: snapControls.getSnapPointValue(SnapPoints.High) }, {
            type: "tween",
            duration: .2,
            ease: "easeOut",
        });
    }, []);

    return (
        <motion.div
            style={{
                y: drawerDragYPx,
            }}
            drag={"y"}
            animate={animate}
            dragElastic={false}
            dragControls={controls}
            initial={{ y: snapControls.clientHeight }}
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
