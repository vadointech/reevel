"use client"

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { TimePicker, useTimePicker } from "@/components/shared/time-picker";

import styles from "./styles.module.scss"

import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";
import { useEventStore } from "@/features/event";

export namespace EventTimePicker {
    export type Props = {
        onHourChange: (hour: string) => void;
        onMinuteChange: (minute: string) => void;
    }
}

const EventTimePicker = observer(({
    onHourChange,
    onMinuteChange
}: EventTimePicker.Props) => {

    const eventStore = useEventStore()

    const controlsLeft = useTimePicker({
        slideCount: 24,
        itemSize: 50,
        itemsInView: 2,
        itemCount: 10,
        loop: true,
        perspective: "left",
        handlers: {
            onChange: ({ api }) => {
                const { index } = api.internalEngine();
                onHourChange(index.get().toString())
            }
        },
    });

    const controlsRight = useTimePicker({
        slideCount: 60,
        itemSize: 50,
        itemsInView: 3,
        itemCount: 10,
        loop: true,
        perspective: "left",
        handlers: {
            onChange: ({ api }) => {
                const { index } = api.internalEngine();
                onMinuteChange(index.get().toString())
            }
        },
    });

    const leftDefaultVariables = controlsLeft.wheel.slides
        .filter((num): num is number => num !== null && num !== undefined)
        .map(num => num.toString());

    const rightDefaultVariables = controlsRight.wheel.slides
        .filter((num): num is number => num !== null && num !== undefined)
        .map(num => num.toString());

    return (
        <div className={styles.embla}>
            <TimePicker
                controls={controlsLeft}
                label={"Hr"}
            />
            <TimePicker
                controls={controlsRight}
                label={"Min"}
            />
        </div>
    );
});

export default EventTimePicker;
