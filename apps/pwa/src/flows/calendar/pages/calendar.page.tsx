"use client";

import {  IconMap } from "@/components/icons";
import { SessionAvatar } from "@/components/shared/session-avatar";
import { CalendarEventCategoryTabs, CalendarTodayEventsSlider } from "@/flows/calendar/components";

import { Link } from "@/i18n/routing";

import { format } from "date-fns";

import styles from "../styles/calendar-page.module.scss";

export namespace CalendarPage {
    export type Props = never;
}

export function CalendarPage() {
    const today = format(new Date(), "d MMM");

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <SessionAvatar className={styles.header__avatar} />
                <h2 className={styles.header__title}>
                    Today, { today }
                </h2>
                <div className={styles.header__controls}>
                    <Link href={"/calendar/map"}>
                        <IconMap />
                    </Link>
                </div>
            </header>

            <CalendarTodayEventsSlider />
            <CalendarEventCategoryTabs />
        </div>
    );
}