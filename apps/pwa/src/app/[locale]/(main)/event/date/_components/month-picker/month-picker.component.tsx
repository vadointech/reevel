"use client";

import { CircularCarousel } from "@/components/shared";
import { ActiveOpacity, ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useDatePicker } from "@/features/event/hooks/use-date-picker.hook";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SliderItem = ({ src }: { src?: string }) => {
    return <p className={styles.item}>{src}</p>;
};

export namespace EventMonthPicker {
    export type Props = {};
}

export const EventMonthPicker = observer(({
}: EventMonthPicker.Props) => {
    const circularMonths = [...MONTHS, ...MONTHS];

    const { handleMonth } = useDatePicker(circularMonths)

    const slides = circularMonths.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 110,
        itemHeight: 100,
        plugins: [ActiveScale, ActiveOpacity],
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