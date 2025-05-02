"use client";

import { ReactNode } from "react";
import { motion, useTransform } from "motion/react";

import { useDrawerContentDragYProgress } from "../../config/motion-values";
import { HERO_SECTION_OFFSET } from "../../config/snap-points";

import styles from "../styles.module.scss";

export namespace EventDrawerContentHeader {
    export type Props = {
        primaryColor: string;
        title: string | ReactNode
    };
}

export const EventDrawerContentHeader = ({
    title,
    primaryColor,
}: EventDrawerContentHeader.Props) => {
    const drawerContentDragYProgress = useDrawerContentDragYProgress();

    const headerOpacity = useTransform(
        drawerContentDragYProgress,
        [
            0,
            HERO_SECTION_OFFSET - 100,
            HERO_SECTION_OFFSET,
        ],
        [
            0,
            0,
            1,
        ],
    );

    const headerTitleOpacity = useTransform(
        drawerContentDragYProgress,
        [
            0,
            HERO_SECTION_OFFSET,
            HERO_SECTION_OFFSET + 40,
        ],
        [
            0,
            0,
            1,
        ],
    );

    return (
        <motion.div
            dragListener={false}
            className={styles.content__header}
            style={{
                opacity: headerOpacity,
                backgroundColor: primaryColor,
            }}
        >
            <motion.h1
                className={styles.hero__title}
                style={{ opacity: headerTitleOpacity }}
            >
                { title }
            </motion.h1>
        </motion.div>
    );
};
