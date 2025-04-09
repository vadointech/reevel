"use client";

import { useEventStore } from "@/features/event";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import { EventMonthPicker } from "../month-picker";
import { EventDatePicker } from "../date-picker";
import { ScheduledDrawer } from "@/components/drawers/scheduled-drawer";
import EventTimePicker from "../time-carousel/time-carousel.component";
import { Toggle } from "../toggle";

import styles from "./styles.module.scss";

export namespace DateSection {
    export type Props = {};
}

export const DateSection = observer(({
}: DateSection.Props) => {
    const { dateStore } = useEventStore()

    const [open, setOpen] = useState<boolean>(false);

    const onClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Toggle className={styles.section__toggle} />

            <div className={styles.section__error}>{dateStore.error}</div>

            <div className={styles.section__carousels}>
                <EventMonthPicker />
                <EventDatePicker />
                <EventTimePicker />
            </div>

            <ScheduledDrawer open={open} onClose={onClose} />
        </>
    );
});