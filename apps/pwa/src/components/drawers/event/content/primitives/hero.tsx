"use client";

import { motion, useTransform } from "motion/react";

import { hexToRgba } from "@/utils/hex-to-rgba";
import { useLocale } from "next-intl";
import { useDrawerContentDragYProgress } from "../../config/motion-values";
import { HERO_SECTION_OFFSET } from "../../config/snap-points";

import { EventDrawerContentDescription } from "./description";
import { IconCalendar, IconEllipsisHorizontal, IconLocation, IconShare, IconTicket } from "@/components/icons";
import { AttendersSection } from "@/components/shared/attenders";
import { UserProfileEntity } from "@/entities/profile";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace EventDrawerContentHero {
    export type Data = {
        primaryColor: string;
        title: string;
        location: string;
        date: Date;
        price: string | number;
        currency: string;
        attendees: UserProfileEntity[];
        description: string;
    };
    export type Props = Data;
}

function formatDate(date: Date, locale: string) {

    const formattedDate = new Date(date).toLocaleDateString(locale, {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    return `${formattedDate.trim()} • ${time}`;
}

export const EventDrawerContentHero = ({
    primaryColor,
    date,
    title,
    location,
    price,
    currency,
    attendees,
    description,
}: EventDrawerContentHero.Props) => {
    const drawerContentDragYProgress = useDrawerContentDragYProgress();

    const locale = useLocale();
    const formattedDate = formatDate(date, locale);

    const titleOpacity = useTransform(
        drawerContentDragYProgress,
        [
            0,
            HERO_SECTION_OFFSET - 100,
            HERO_SECTION_OFFSET,
        ],
        [
            1,
            1,
            0,
        ],
    );

    return (
        <div
            className={styles.hero}
        >
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
            <motion.div style={{ opacity: titleOpacity }}>
                <h1 className={styles.hero__title}>
                    { title }
                </h1>
            </motion.div>

            <div className={styles.hero__date}>
                <div className={styles.hero__date_item}>
                    <IconLocation />
                    { location }
                </div>
                <div className={styles.hero__date_item}>
                    <IconCalendar />
                    { formattedDate }
                </div>
            </div>

            <div className={styles.hero__price}>
                { price } { currency }
                <AttendersSection users={attendees} />
            </div>

            <div className={styles.hero__buttons}>
                <button
                    className={cx(
                        styles.hero__button,
                        styles.hero__button_primary,
                        styles.hero__button_join,
                    )}
                >
                    <IconTicket />
                    Join
                </button>

                <button
                    className={cx(
                        styles.hero__button,
                        styles.hero__button_share,
                    )}
                >
                    <IconShare />
                    Share
                </button>

                <button
                    className={cx(
                        styles.hero__button,
                        styles.hero__button_more,
                    )}
                >
                    <IconEllipsisHorizontal />
                    More
                </button>
            </div>

            <EventDrawerContentDescription>
                { description }
            </EventDrawerContentDescription>
        </div>
    );
};
