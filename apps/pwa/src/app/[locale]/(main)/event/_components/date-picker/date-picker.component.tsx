"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";
import { OptionItem } from "@/components/shared/options";
import { IconDollar, IconTicket } from "@/components/icons";
import { TicketsDrawer } from "@/components/drawers/tickets-drawer";
import { PricingDrawer } from "@/components/drawers/pricing-drawer";
import { useEventStore } from "@/features/event";
import { Section, SectionItems } from "@/components/shared/section";

import styles from "./styles.module.scss"
import { DateDrawer } from "@/components/drawers/date-drawer";
import { formatDayMonth, formatTime } from "@/utils/time";
import { TimeDrawer } from "@/components/drawers/time-drawer";

export namespace DatePicker {
    export type Props = {};
}


export const DatePicker = observer(({ }: DatePicker.Props) => {
    const [dateDrawerOpen, setDateDrawerOpen] = useState(false)
    const [startTimeDrawerOpen, setStartTimeDrawerOpen] = useState(false)
    const [endTimeDrawerOpen, setEndTimeDrawerOpen] = useState(false)



    const eventStore = useEventStore()

    const handleDateDrawerClose = () => setDateDrawerOpen(false);
    const handleStartTimeDrawerClose = () => setStartTimeDrawerOpen(false);
    const handleEndTimeDrawerClose = () => setEndTimeDrawerOpen(false);



    return (
        <Section title="Pricing" className={styles.section}>
            <SectionItems variant="column" className={styles.section__items}>
                <OptionItem
                    label="Date"
                    description={`${formatDayMonth(eventStore.dateStore.startDate)} `}

                    icon={<IconTicket />}
                    onClick={() => setDateDrawerOpen(true)}
                    backIcon
                />

                <OptionItem
                    label="Start Time"
                    description={`${formatTime(eventStore.dateStore.startHour, eventStore.dateStore.startMinute)}`}

                    icon={<IconDollar />}
                    onClick={() => setStartTimeDrawerOpen(true)}
                    backIcon
                />

                <OptionItem
                    label="End Time"
                    description={`${formatTime(eventStore.dateStore.endHour, eventStore.dateStore.endMinute)}`}

                    icon={<IconDollar />}
                    onClick={() => setEndTimeDrawerOpen(true)}
                    backIcon
                />

                <DateDrawer open={dateDrawerOpen} onClose={handleDateDrawerClose} />
                <TimeDrawer open={startTimeDrawerOpen} onClose={handleStartTimeDrawerClose} variant="start" />
                <TimeDrawer open={endTimeDrawerOpen} onClose={handleEndTimeDrawerClose} variant="and" />
            </SectionItems>
        </Section>
    );
});
