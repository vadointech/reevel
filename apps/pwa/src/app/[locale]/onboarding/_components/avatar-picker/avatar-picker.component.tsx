"use client";

import { Avatar } from "@/components/ui";
import { CircularCarousel } from "@/components/shared/circular-carousel";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";

const SliderItem = () => {
    return <Avatar size={100} />;
};

const slides = [
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
    <SliderItem />,
];

export namespace OnboardingAvatarPicker {
    export type Props = {};
}

export const OnboardingAvatarPicker = ({}: OnboardingAvatarPicker.Props) => {

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 146,
        itemHeight: 100,
        plugins: [ActiveScale],
    });

    return (
        <div
            className={styles.picker}
            style={{
                height: 160,
            }}
        >
            <div className={styles.picker__circle} />
            <div className={styles.picker__options}>
                <CircularCarousel carousel={carousel} />
            </div>
        </div>
    );
};