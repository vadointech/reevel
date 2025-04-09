"use client";

import { ComponentProps } from "react";
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";
import { Back } from "@/components/icons";
import styles from "./styles.module.scss";
import cx from "classnames";
import { formatDate, formatTime } from "@/utils/time";

export namespace Toggle {
    export type Props = ComponentProps<"div"> & {};
}

export const Toggle = observer(({ className, ...props }: Toggle.Props) => {
    const eventStore = useEventStore();

    const { dateStore } = eventStore;
    const { toggle, startMonth, startDate, endMonth, endDate, startHour, startMinute, endHour, endMinute } = dateStore;

    const handleToggle = () => dateStore.setToggle(!toggle);

    const startTime = formatTime(startHour, startMinute);
    const endTime = formatTime(endHour, endMinute);
    const startDateText = formatDate(startMonth, startDate, "Required");
    const endDateText = formatDate(endMonth, endDate, "Optional");

    return (
        <div
            className={cx(styles.toggle, className, {
                [styles.toggle__selected]: toggle
            })}
            onClick={handleToggle}
            {...props}
        >
            <ToggleElement
                isSelected={toggle}
                date={startDateText}
                time={startTime}
            />

            <Back strokeWidth={2} height={20} width={10} />

            <ToggleElement
                isSelected={!toggle}
                date={endDateText}
                time={endTime}
            />
        </div>
    );
});

const ToggleElement = ({ isSelected, date, time }: {
    isSelected: boolean;
    date: string;
    time: string;
}) => (
    <div className={cx(styles.toggle__element, {
        [styles.toggle__element_selected]: isSelected
    })}>
        {date}
        <span>{time}</span>
    </div>
);