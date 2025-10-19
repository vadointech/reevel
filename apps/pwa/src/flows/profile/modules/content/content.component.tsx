"use client";

import { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { useProfileContentSnap } from "./use-content-snap";

import styles from "../../styles/profile-page.module.scss";

export namespace ProfilePageContent {
    export type Props = PropsWithChildren;
}

export const ProfilePageContent = ({ children }: ProfilePageContent.Props) => {
    const { containerRef } = useProfileContentSnap();
  
    return (
        <motion.div
            ref={containerRef}
            className={styles.page}
        >
            { children }
        </motion.div>
    );
};
