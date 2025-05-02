"use client";

import Image, { ImageProps } from "next/image";
import { motion, useTransform } from "motion/react";

import {
    useDrawerContentDragYProgress,
    useDrawerContentOverscrollYProgress,
    useDrawerDragYProgress,
} from "../../config/motion-values";

import styles from "../styles.module.scss";

export namespace EventDrawerContentPoster {
    export type Data = ImageProps["src"];
    export type Props = {
        src: Data
    };
}

export const EventDrawerContentPoster = ({ src }: EventDrawerContentPoster.Props) => {
    const drawerDragYProgress = useDrawerDragYProgress();
    const drawerContentDragYProgress = useDrawerContentDragYProgress();
    const dragOverscrollYProgress = useDrawerContentOverscrollYProgress();

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
            className={styles.content__poster}
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
