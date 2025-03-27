"use client"

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { TimePicker, useTimePicker } from "@/components/shared/time-picker";

import styles from "./styles.module.scss"
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";

type PropType = {
    loop?: EmblaOptionsType["loop"]
};

const EmblaCarousel: React.FC<PropType> = observer(() => {

    const eventStore = useEventStore()

    const HadnleHour = (value: any) => {
        console.log(value)
    }

    const controlsLeft = useTimePicker({
        slideCount: 24,
        itemSize: 50,
        itemsInView: 2,
        itemCount: 10,
        loop: true,
        perspective: "left",
        handlers: {
            onChange: (carousel) => HadnleHour(carousel.api.selectedScrollSnap()),
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
            onChange: (test) => console.log(test.handlers.onChange)
        },
    });

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
