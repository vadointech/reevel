"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

import styles from "./styles.module.scss";
import "react-day-picker/style.css";

export namespace Calendar {
    export type Props = never;
}

export const Calendar = () => {
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
        const weekdayName = weekday.toLocaleDateString("en-US", { weekday: "long" });
        return weekdayName.charAt(0);
    };
    const eventDates = [new Date(2025, 4, 20), new Date(2025, 4, 15)];

    return (
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
                }
            }}
            showOutsideDays
            weekStartsOn={0}
            classNames={customClassNames}
            modifiersClassNames={modifiersClasses}
            formatters={{ formatWeekdayName }}
        />
    );
};
