"use client";

import { motion, useTransform } from "motion/react";

import { HERO_SECTION_OFFSET } from "../root/snap-controls";
import { useDrawerDragYProgress } from "../root";

import {
    EventDrawerContentHeader,
    EventDrawerContentHero,
    EventDrawerContentHost,
    EventDrawerContentPoster,
    EventDrawerContentScroller,
} from "./primitives";
import { IconClose } from "@/components/icons";

import styles from "./styles.module.scss";

export namespace EventDrawerContent {
    export type Data = {
        poster: string;
        primaryColor: string;
        title: string;
        location: string;
        date: Date;
        price: string | number;
        currency: string;
        host: {
            name: string;
            avatar: string;
        },
        attendees: Array<{
            id: string;
            avatar: string;
        }>
        attendeesCount: number;
        description: string;
    };

    export type Props = Data;
}

export const EventDrawerContent = ({
    host,
    poster,
    primaryColor,
    title,
    ...data
}: EventDrawerContent.Props) => {
    const dragYProgress = useDrawerDragYProgress();

    const contentTranslate = useTransform<number, number>(
        dragYProgress,
        [1, 0],
        [HERO_SECTION_OFFSET, 0],
    );

    return (
        <>
            <div className={styles.content__close}>
                <IconClose width={8} height={8} />
            </div>
            <EventDrawerContentHost host={host} primaryColor={primaryColor} />
            <EventDrawerContentPoster src={poster} />
            <EventDrawerContentHeader
                title={title}
                primaryColor={primaryColor}
            />
            <motion.div
                style={{ y: contentTranslate }}
                className={styles.content}
            >
                <EventDrawerContentScroller>
                    <EventDrawerContentHero
                        primaryColor={primaryColor}
                        title={title}
                        {...data}
                    />
                </EventDrawerContentScroller>
            </motion.div>
        </>
    );
};