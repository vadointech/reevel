"use client";


import { observer } from "mobx-react-lite";
import { Toggle } from "@/components/shared/toggle";

import { EventMonthPicker } from "../month-picker";
import { EventDatePicker } from "../date-picker";

import styles from "./styles.module.scss";
import { useEventStore } from "@/features/event";
import { useState } from "react";
import { ScheduledDrawer } from "@/components/drawers/scheduled-drawer";

import EventTimePicker from "../time-carousel/time-carousel.component";


export namespace DateSection {
    export type Props = {
    };
}

export const DateSection = observer(({
}: DateSection.Props) => {
    const eventStore = useEventStore()

    const [open, setOpen] = useState<boolean>(false);

    const onClose = () => {
        setOpen(false)
    }
    return (
        <>
            <Toggle className={styles.section__toggle} />

            {/* /ХЗ чи треба зберігати помилку в Stori, але так всьо норм робить */}
            <div className={styles.section__error}>{eventStore.dateStore.error}</div>

            <button onClick={() => setOpen(true)}>
                open
            </button>


            <div className={styles.section__carousels}>
                <EventMonthPicker />
                <EventDatePicker />
                <EventTimePicker />
            </div>

            <ScheduledDrawer open={open} onClose={onClose} />
        </>
    );
});