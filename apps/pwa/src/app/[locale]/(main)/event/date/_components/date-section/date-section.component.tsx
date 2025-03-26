"use client";


import { observer } from "mobx-react-lite";
import { Toggle } from "@/components/ui/toggle";

import { EventMonthPicker } from "../month-picker";
import { EventDatePicker } from "../date-picker";

import styles from "./styles.module.scss";
import { useEventStore } from "@/features/event";
import { useState } from "react";


export namespace DateSection {
    export type Props = {
    };
}

export const DateSection = observer(({
}: DateSection.Props) => {
    const [selectedStart, setSelectedStart] = useState<boolean>(true);

    const eventStore = useEventStore()


    return (
        <>
            <Toggle
                startMonth={eventStore.dateStore.startMonth}
                startDate={eventStore.dateStore.startDate}
                className={styles.section__toggle}
                selectedStart={selectedStart}
                setSelectedStart={setSelectedStart}
            />

            <div className={styles.section__carousels}>
                <EventMonthPicker selectedStart={selectedStart} />
                <EventDatePicker selectedStart={selectedStart} />
            </div>
        </>
    );
});