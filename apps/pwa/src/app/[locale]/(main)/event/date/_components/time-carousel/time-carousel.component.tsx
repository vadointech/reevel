"use client"

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { TimePicker, useTimePicker } from "@/components/shared/time-picker";

import styles from "./styles.module.scss"
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";

type PropType = {
    loop?: EmblaOptionsType["loop"]
};

const EmblaCarousel: React.FC<PropType> = observer(() => {

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
                handleHour(index.get())
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
                handleMinute(index.get())
            }
        },
    });

    const leftDefaultVariables = controlsLeft.wheel.slides
        .filter((num): num is number => num !== null && num !== undefined)
        .map(num => num.toString());

    const rightDefaultVariables = controlsRight.wheel.slides
        .filter((num): num is number => num !== null && num !== undefined)
        .map(num => num.toString());

    const { handleHour } = useDatePicker(leftDefaultVariables)

    const { handleMinute } = useDatePicker(rightDefaultVariables)



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

export default EmblaCarousel;
