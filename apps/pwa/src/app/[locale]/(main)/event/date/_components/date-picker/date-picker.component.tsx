"use client";

import { CircularCarousel } from "@/components/shared";
import { ActiveOpacity, ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";

const SliderItem = ({ src, day }: { src?: string, day: string }) => {
    return <div className={styles.item}>{src} <span>{day}</span></div>;
};

export namespace EventDatePicker {
    export type Props = {
    };
}


// TODO - Коли змінюємо Start Date to EndDate і так туда сюда, в колесі потрібно показувати те що вибрано, а не по дефолту
export const EventDatePicker = observer(({
}: EventDatePicker.Props) => {
    const { daySlides, handleDate } = useDatePicker();

    const slides = daySlides.map(({ label, day }) => (
        <SliderItem key={label} src={label} day={day} />
    ));

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 80,
        itemHeight: 100,
        plugins: [ActiveScale, ActiveOpacity],
        handlers: {
            onChange(carousel) {
                handleDate(
                    (carousel.api.selectedScrollSnap() + 1).toString()
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