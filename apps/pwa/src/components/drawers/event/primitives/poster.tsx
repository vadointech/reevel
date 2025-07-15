"use client";

import Image, { ImageProps } from "next/image";
import { motion, useTransform } from "motion/react";

import { useEventDrawerContext } from "../event-drawer.context";

import styles from "../styles.module.scss";

export namespace EventDrawerContentPoster {
    export type Data = ImageProps["src"];
    export type Props = {
        src: Data
    };
}

export const EventDrawerContentPoster = ({ src }: EventDrawerContentPoster.Props) => {
    const {
        drawerDragYProgress,
        drawerContentDragYPx,
        drawerContentDragYProgress,
    } = useEventDrawerContext();

    const dragOverscrollYProgress = useTransform(
        drawerContentDragYPx,
        (val) => {
            return val > 0 ? val : 0;
        },
    );

    const posterScrew = useTransform(dragOverscrollYProgress, (val) => {
        return 1 + val / 1000;
    });

    const posterTranslate = useTransform<number, number>(
        [drawerDragYProgress, drawerContentDragYProgress],
        ([drawerY, contentY]) => {
            return (1 - drawerY) * -100 + contentY / -6;
        },
    );

    return (
        <motion.div
            className={styles.poster}
            style={{
                y: posterTranslate,
                scaleY: posterScrew,
                transformOrigin: "top center",
            }}
        >
            <Image
                fill
                src={src}
                alt={"poster"}
            />
        </motion.div>
    );
};
