"use client";

import { ComponentProps, Dispatch, ReactNode, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Back } from "@/components/icons";
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";

export namespace Toggle {
    export type Props = ComponentProps<"div"> & {
    };
}

export const Toggle = observer(({
    className,
    ...props
}: Toggle.Props) => {

    const eventStore = useEventStore()

    const formattedHour = eventStore.dateStore.startHour ? String(eventStore.dateStore.startHour).padStart(2, "0") : "00";
    const formattedMinute = eventStore.dateStore.startMinute ? String(eventStore.dateStore.startMinute).padStart(2, "0") : "00";

    const timeString = eventStore.dateStore.startHour ? `${formattedHour}:${formattedMinute}` : "Start Date";
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

                {eventStore.dateStore.startMonth ? `${eventStore.dateStore.startMonth} ${eventStore.dateStore.startDate}` : "Required"}
                <span>
                    {timeString}
                </span>
            </div>

            <Back strokeWidth={2} height={20} width={10} />

            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: !eventStore.dateStore.toggle
            })}>
                {eventStore.dateStore.endMonth ? `${eventStore.dateStore.endMonth} ${eventStore.dateStore.endDate}` : "Optional"}
                <span>{eventStore.dateStore.endHour ? `${eventStore.dateStore.endHour}:${eventStore.dateStore.endMinute}` : "Start Date"}</span>
            </div>
        </div>
    );
});