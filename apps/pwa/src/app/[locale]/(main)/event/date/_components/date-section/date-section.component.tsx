"use client";


import { observer } from "mobx-react-lite";
import { Toggle } from "@/components/ui/toggle";

import { EventMonthPicker } from "../month-picker";
import { EventDatePicker } from "../date-picker";

import styles from "./styles.module.scss";
import { useEventStore } from "@/features/event";
import { useState } from "react";
import EmblaCarousel from "../time-carousel/time-carousel.component";


export namespace DateSection {
    export type Props = {
    };
}

export const DateSection = observer(({
}: DateSection.Props) => {
    const eventStore = useEventStore()


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


            <div className={styles.section__carousels}>
                <EventMonthPicker />
                <EventDatePicker />

            </div>
        </>
    );
});