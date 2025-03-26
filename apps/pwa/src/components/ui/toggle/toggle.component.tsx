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

        selectedStart: boolean
        setSelectedStart: Dispatch<SetStateAction<boolean>>;
    };
}

export const Toggle = observer(({
    startMonth,
    startDate,
    startHour,
    startMinute,
    className,
    selectedStart,
    setSelectedStart,
    ...props
}: Toggle.Props) => {

    const eventStore = useEventStore()
    return (
        <div
            className={cx(styles.toggle, className, {
                [styles.toggle__selected]: selectedStart
            })}
            onClick={() => setSelectedStart(!selectedStart)}
            {...props}
        >
            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: selectedStart
            })}>

                {startMonth ? `${startMonth} ${startDate}` : "Required"}
                <span>Start Date</span>
            </div>

            <Back strokeWidth={2} height={20} width={10} />

            <div className={cx(styles.toggle__element, {
                [styles.toggle__element_selected]: !selectedStart
            })}>
                Optional
                <span>End Date</span>
            </div>
        </div>
    );
});