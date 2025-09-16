"use client";

import { ReactNode } from "react";
import { motion, useTransform } from "motion/react";
import { useEventDrawer } from "@/features/discover/hooks";

import { useEventDrawerContext } from "./event-drawer.context";

import {
    EventDrawerContentScroller,
    EventDrawerContentPoster,
    EventDrawerContentHeader,
    EventDrawerContentHero,
    EventDrawerContentHost,
} from "./primitives";

import { BottomSheetHandle } from "@/components/shared/bottom-sheet";
import { CloseButton } from "@/components/ui";

import { EventEntity } from "@/entities/event";

import styles from "./styles.module.scss";

export namespace EventDrawerContent {
    export type Data = {
        event: EventEntity;
    };
    export type Props = Data & {
        children: ReactNode;
    };
}

export const EventDrawerContent = ({ children, event }: EventDrawerContent.Props) => {
    const { drawerDragYProgress, config } = useEventDrawerContext();
    const contentTranslate = useTransform<number, number>(
        drawerDragYProgress,
        [1, 0],
        [config.heroSectionOffset, 0],
    );

    const { handleClose } = useEventDrawer();

    return (
        <>
            <BottomSheetHandle className={styles.handle}>
                <div onClick={handleClose} className={styles.header__close}>
                    <CloseButton />
                </div>
                <EventDrawerContentHost hosts={event.hosts} primaryColor={event.primaryColor} />
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
