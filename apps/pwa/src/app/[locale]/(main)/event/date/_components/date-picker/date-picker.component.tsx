"use client";

import { CircularCarousel } from "@/components/shared";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";
import { useEventStore } from "@/features/event";

const SliderItem = ({ src }: { src?: string }) => {
    return <div className={styles.item}>{src} <span>Mon</span></div>;
};

export namespace EventDatePicker {
    export type Props = {
    };
}

export const EventDatePicker = observer(({
}: EventDatePicker.Props) => {
    const slide = [...Array(30)].map((_, i) => (i + 1).toString());

    const { handleDate } = useDatePicker(slide)

    const slides = slide.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 80,
        itemHeight: 100,
        plugins: [ActiveScale],
        handlers: {
            onChange(carousel) {
                handleDate(
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