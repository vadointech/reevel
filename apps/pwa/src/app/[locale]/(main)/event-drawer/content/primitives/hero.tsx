"use client";

import Image from "next/image";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation, useTransform, AnimationControls } from "motion/react";

import { HERO_SECTION_OFFSET } from "../../root/snap-controls";
import { useDrawerContentDragYProgress } from "../../root";
import { hexToRgba } from "@/utils/hex-to-rgba";
import { useLocale } from "next-intl";

import { IconCalendar, IconEllipsisHorizontal, IconLocation, IconShare, IconTicket } from "@/components/icons";

import cx from "classnames";
import styles from "../styles.module.scss";
import { EventDrawerContentDescription } from "@/app/[locale]/(main)/event-drawer/content/primitives/description";

export namespace EventDrawerContentHero {
    export type Data = {
        primaryColor: string;
        title: string;
        location: string;
        date: Date;
        price: string | number;
        currency: string;
        attendees: Array<{
            id: string;
            avatar: string;
        }>
        attendeesCount: number;
        description: string;
    };
    export type Props = Data;
}

function formatDate(date: Date, locale: string) {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
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
    attendeesCount,
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
            <motion.h1
                className={styles.hero__title}
                style={{ opacity: titleOpacity }}
            >
                { title }
            </motion.h1>

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
                <span>
                    { price } { currency }
                </span>
                {
                    attendees.length > 0 && (
                        <div className={styles.hero__attendees}>
                            {
                                attendees.map(item => (
                                    <Avatar
                                        key={item.id}
                                        src={item.avatar}
                                    />
                                ))
                            }
                            {
                                attendees.length >= 3 && (
                                    <div className={styles.hero__attendees_more}>
                                        +{ attendeesCount - attendees.length } more going
                                    </div>
                                )
                            }
                        </div>
                    )
                }
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
                    <span>Join</span>
                </button>

                <button
                    className={cx(
                        styles.hero__button,
                        styles.hero__button_share,
                    )}
                >
                    <IconShare />
                    <span>Share</span>
                </button>

                <button
                    className={cx(
                        styles.hero__button,
                        styles.hero__button_more,
                    )}
                >
                    <IconEllipsisHorizontal />
                    <span>More</span>
                </button>
            </div>

            <EventDrawerContentDescription>
                { description }
            </EventDrawerContentDescription>
        </div>
    );
};

const Avatar = ({ src }: { src: string }) => {
    return (
        <div
            className={styles.hero__avatar}
        >
            <Image
                fill
                src={src}
                alt={"avatar"}
            />
        </div>
    );
};
