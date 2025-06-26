"use client";

import { motion, useTransform } from "motion/react";

import { useEventDrawerContext } from "../event-drawer.context";
import { useCreateEventFormFieldFormatter } from "@/features/event/create";
import { hexToRgba } from "@/utils/hex-to-rgba";

import { EventDrawerHeroButtons } from "./buttons";
import { EventDrawerContentDescription } from "./description";
import { IconCalendar, IconLocation } from "@/components/icons";
import { AttendersSection } from "@/components/ui/attenders";

import { EventEntity } from "@/entities/event";

import styles from "../styles.module.scss";


export namespace EventDrawerContentHero {
    export type Data = EventEntity;
    export type Props = Data;
}

export const EventDrawerContentHero = ({
    primaryColor = "red",
    title,
    location,
    ticketPrice,
    visibility,
    description,
    tickets,
    startDate,
}: EventDrawerContentHero.Props) => {
    const {
        config,
        drawerContentDragYProgress,
    } = useEventDrawerContext();

    const formatter = useCreateEventFormFieldFormatter();

    const titleOpacity = useTransform(
        drawerContentDragYProgress,
        [
            0,
            config.heroSectionOffset - 100,
            config.heroSectionOffset,
        ],
        [
            1,
            1,
            0,
        ],
    );


    return (
        <div className={styles.hero}>
            <div className={styles.hero__background}>
                <div
                    className={styles.hero__background_gradient}
                    style={{
                        background: `linear-gradient(
                            to top,
                            ${hexToRgba(primaryColor, 1)} 30%,
                            ${hexToRgba(primaryColor, 0.8)} 38%,
                            ${hexToRgba(primaryColor, 0.6)} 52%,
                            ${hexToRgba(primaryColor, 0.4)} 66%,
                            ${hexToRgba(primaryColor, 0.2)} 80%,
                            ${hexToRgba(primaryColor, 0.05)} 92%,
                            ${hexToRgba(primaryColor, 0)} 100%
                        )`,
                    }}
                />

                <div
                    className={styles.hero__background_solid}
                    style={{ background: primaryColor }}
                />
            </div>

            <div className={styles.hero__content}>
                <motion.div style={{ opacity: titleOpacity }}>
                    <h1 className={styles.hero__title}>
                        { title }
                    </h1>
                </motion.div>

                <div className={styles.hero__date}>
                    <div className={styles.hero__date_item}>
                        <IconLocation />
                        { location?.type }
                    </div>
                    <div className={styles.hero__date_item}>
                        <IconCalendar />
                        { formatter.formatDate(startDate) }
                    </div>
                </div>
                <div className={styles.hero__buttons}>
                    <EventDrawerHeroButtons visibility={visibility} />
                </div>
                <div className={styles.hero__price}>
                    { ticketPrice } ₴
                    <AttendersSection users={tickets.map(item => item.user.profile)} />
                </div>
                <EventDrawerContentDescription>
                    { description }
                </EventDrawerContentDescription>
            </div>
        </div>
    );
};
