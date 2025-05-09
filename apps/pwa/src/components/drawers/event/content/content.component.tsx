"use client";

import { ReactNode } from "react";
import { motion, useTransform } from "motion/react";

import { useDrawerDragYProgress } from "../config/motion-values";
import { HERO_SECTION_OFFSET } from "../config/snap-points";

import {
    EventDrawerContentHeader,
    EventDrawerContentHero,
    EventDrawerContentHost,
    EventDrawerContentPoster,
    EventDrawerContentScroller,
} from "./primitives";
import { IconClose } from "@/components/icons";
import { UserProfileEntity } from "@/entities/profile";

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
        attendees: UserProfileEntity[]
        attendeesCount: number;
        description: string;
    };

    export type Props = Data & {
        children: ReactNode;
    };
}

export const EventDrawerContent = ({
    host,
    poster,
    primaryColor,
    title,
    children,
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
                    <div className={styles.content__content}>
                        {children}
                    </div>
                </EventDrawerContentScroller>
            </motion.div>
        </>
    );
};