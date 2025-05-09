"use client"
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { useEventStore } from "@/features/event";
import { DayPicker } from "react-day-picker";


import "react-day-picker/style.css";
import styles from "./styles.module.scss"

import { observer } from "mobx-react-lite";
import { useState } from "react";
import "react-day-picker/style.css";

export namespace DateDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const DateDrawer = observer(({ open, onClose }: DateDrawer.Props) => {
    const eventStore = useEventStore()

    const [selected, setSelected] = useState<Date>(new Date());

    const customClassNames = {
        root: styles.rdp,
        nav: styles.nav,
        caption_label: styles.caption_label,
        month_caption: styles.month_caption,
        month_grid: styles.month_grid,
        day: styles.day,
    };

    const modifiersClasses = {
        selected: styles.day_selected,
        today: styles.day_today,
        outside: styles.day_outside,
        disabled: styles.day_disabled,
        hasEvent: styles.hasEvent,
    };

    const formatWeekdayName = (weekday: Date) => {
        const weekdayName = weekday.toLocaleDateString('en-US', { weekday: 'long' });
        return weekdayName.charAt(0);
    };
    const eventDates = [new Date(2025, 4, 20), new Date(2025, 4, 15)];

    return (
        <Drawer open={open} staticPoint={"hight"}>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <h2>Select Date</h2>
                    <div className={styles.drawer__picker}>
                        <DayPicker
                            captionLayout="label"
                            animate
                            modifiers={{ hasEvent: eventDates }}
                            disabled={{ before: new Date() }}
                            mode="single"
                            selected={selected}
                            onSelect={(date) => {
                                if (date) {
                                    setSelected(date);
                                    eventStore.dateStore.setStartDate(date);
                                    onClose?.();
                                }
                            }}
                            showOutsideDays
                            weekStartsOn={0}
                            classNames={customClassNames}
                            modifiersClassNames={modifiersClasses}
                            formatters={{ formatWeekdayName }}
                        />
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
});


