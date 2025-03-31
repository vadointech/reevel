"use client";

import { ComponentProps, Dispatch, ReactNode, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Back } from "@/components/icons";
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";

export namespace Toggle {
    export type Props = ComponentProps<"div"> & {
        startMonth?: string
        startDate?: string
        startHour?: string
        startMinute?: string

        endMonth?: string
        endDate?: string
        endHour?: string
        endMinute?: string
    };
}

export const Toggle = observer(({
    startMonth,
    startDate,
    startHour,
    startMinute,

    endMonth,
    endDate,
    endHour,
    endMinute,
    className,
    ...props
}: Toggle.Props) => {

    const eventStore = useEventStore()

    const formattedHour = startHour ? String(startHour).padStart(2, "0") : "00";
    const formattedMinute = startMinute ? String(startMinute).padStart(2, "0") : "00";

    const timeString = startHour ? `${formattedHour}:${formattedMinute}` : "Start Date";
    return (
        <div
            className={cx(styles.toggle, className, {
                [styles.toggle__selected]: eventStore.dateStore.toggle
            })}
            onClick={() => eventStore.dateStore.setToggle(!eventStore.dateStore.toggle)}
            {...props}
        >
            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: eventStore.dateStore.toggle
            })}>

                {startMonth ? `${startMonth} ${startDate}` : "Required"}
                <span>
                    {timeString}
                </span>
            </div>

            <Back strokeWidth={2} height={20} width={10} />

            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: !eventStore.dateStore.toggle
            })}>
                {endMonth ? `${endMonth} ${endDate}` : "Optional"}
                <span>{endHour ? `${endHour}:${endMinute}` : "Start Date"}</span>
            </div>
        </div>
    );
});