"use client";

import { CircularCarousel } from "@/components/shared";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";
import { useEventStore } from "@/features/event";
import { useEffect } from "react";

const SliderItem = ({ src }: { src?: string }) => {
    return <p className={styles.item}>{src}</p>;
};

export namespace EventMonthPicker {
    export type Props = {
    };
}

export const EventMonthPicker = observer(({
}: EventMonthPicker.Props) => {
    const slide = ['Jan', 'Apr', 'Jul', 'Oct', 'Feb', 'May', 'Aug', 'Nov', 'Mar', 'Jun', 'Sep', 'Dec', 'Jan', 'Apr', 'Jul', 'Oct', 'Feb', 'May', 'Aug', 'Nov', 'Mar', 'Jun', 'Sep', 'Dec']

    const { handleMonth } = useDatePicker(slide)

    const slides = slide.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 110,
        itemHeight: 100,
        plugins: [ActiveScale],
        handlers: {
            onChange(carousel) {
                handleMonth(
                    carousel.api.selectedScrollSnap(),
                );
            },
        },
    });

    return (
        <div
            className={styles.picker}
            style={{
                height: 500,
            }}
        >
            <div className={styles.picker__options}>
                <CircularCarousel carousel={carousel} />
            </div>
        </div>
    );
});