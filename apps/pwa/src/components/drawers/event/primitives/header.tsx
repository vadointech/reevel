"use client";

import { ReactNode } from "react";
import { motion, useTransform } from "motion/react";
import { useEventDrawerContext } from "@/components/drawers/event/event-drawer.context";

import styles from "../styles.module.scss";

export namespace EventDrawerContentHeader {
    export type Props = {
        title: string | ReactNode
        primaryColor?: string;
    };
}

export const EventDrawerContentHeader = ({
    title,
    primaryColor,
}: EventDrawerContentHeader.Props) => {
    const {
        config,
        drawerContentDragYProgress,
    } = useEventDrawerContext();

    const headerOpacity = useTransform(
        drawerContentDragYProgress,
        [
            0,
            config.heroSectionOffset - 100,
            config.heroSectionOffset,
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
            config.heroSectionOffset,
            config.heroSectionOffset + 40,
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
            className={styles.header}
            style={{
                opacity: headerOpacity,
                backgroundColor: primaryColor,
            }}
        >
            <motion.div style={{ opacity: headerTitleOpacity }}>
                <h2 className={styles.hero__title}>
                    { title }
                </h2>
            </motion.div>
        </motion.div>
    );
};
