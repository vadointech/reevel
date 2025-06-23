"use client";

import { DayPicker } from "react-day-picker";

import styles from "./styles.module.scss";
import "react-day-picker/style.css";

export namespace Calendar {
    export type Props = {
        value?: Date;
        onChange?: (value?: Date) => void;
        hasEvent?: Date[]
    };
}

export const Calendar = ({
    value,
    onChange,
    hasEvent,
}: Calendar.Props) => {
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
    return (
        <DayPicker
            captionLayout="label"
            animate
            modifiers={{ hasEvent }}
            disabled={{ before: new Date() }}
            mode="single"
            selected={value}
            onSelect={onChange}
            showOutsideDays
            weekStartsOn={0}
            classNames={customClassNames}
            modifiersClassNames={modifiersClasses}
            formatters={{ formatWeekdayName }}
        />
    );
};
