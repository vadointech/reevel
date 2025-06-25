"use client";


import { ReactNode } from "react";
import { motion, useTransform } from "motion/react";

import { useEventDrawerContext } from "./event-drawer.context";

import {
    EventDrawerContentHeader,
    EventDrawerContentHero,
    EventDrawerContentHost,
    EventDrawerContentPoster,
    EventDrawerContentScroller,
} from "./primitives";

import { EventEntity } from "@/entities/event";

import styles from "./styles.module.scss";
import { BottomSheetHandle } from "@/components/shared/bottom-sheet";
import { CloseButton } from "@/components/ui";

export namespace EventDrawerContent {
    export type Data = EventEntity;
    export type Props = Data & {
        children: ReactNode;
    };
}

export const EventDrawerContent = ({ children,  ...event }: EventDrawerContent.Props) => {
    const { drawerDragYProgress, config } = useEventDrawerContext();

    const contentTranslate = useTransform<number, number>(
        drawerDragYProgress,
        [1, 0],
        [config.heroSectionOffset, 0],
    );

    return (
        <>
            <BottomSheetHandle className={styles.handle}>
                <div className={styles.header__close}>
                    <CloseButton />
                </div>
                <EventDrawerContentHost host={event.host} primaryColor={event.primaryColor} />
                <EventDrawerContentPoster src={event.poster} />
                <EventDrawerContentHeader
                    title={event.title}
                    primaryColor={event.primaryColor}
                />
            </BottomSheetHandle>
            <motion.div
                style={{ y: contentTranslate }}
                className={styles.content}
            >
                <EventDrawerContentScroller>
                    <EventDrawerContentHero {...event} />
                    <div className={styles.content__body}>
                        { children }
                    </div>
                </EventDrawerContentScroller>
            </motion.div>
        </>
    );
};
