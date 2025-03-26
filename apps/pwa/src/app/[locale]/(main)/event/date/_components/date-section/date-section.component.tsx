"use client";


import { observer } from "mobx-react-lite";
import { Toggle } from "@/components/ui/toggle";

import { EventMonthPicker } from "../month-picker";
import { EventDatePicker } from "../date-picker";

import styles from "./styles.module.scss";
import { useEventStore } from "@/features/event";
import { useState } from "react";
import EmblaCarousel from "../time-carousel/time-carousel.component";
import { ScheduledDrawer } from "@/components/drawers/scheduled-drawer";


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
            <Toggle
                startMonth={eventStore.dateStore.startMonth}
                startDate={eventStore.dateStore.startDate}

                endMonth={eventStore.dateStore.endMonth}
                endDate={eventStore.dateStore.endDate}

                className={styles.section__toggle}

            />
            <section className={styles.section__date}>
                <EmblaCarousel loop={true} />

            </section>

            <button onClick={() => setOpen(true)}>
                test
            </button>


            <div className={styles.section__carousels}>
                <EventMonthPicker />
                <EventDatePicker />
            </div>

            <ScheduledDrawer open={open} onClose={onClose} />
        </>
    );
});