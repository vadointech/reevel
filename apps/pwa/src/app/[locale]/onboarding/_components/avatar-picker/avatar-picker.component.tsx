"use client";

import { CircularCarousel } from "@/components/shared/circular-carousel/circular-carousel.component";
import { Avatar } from "@/components/ui";

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
  export type Props = {}
}

export const OnboardingAvatarPicker = ({}: OnboardingAvatarPicker.Props) => {
    return (
        <div className={styles.picker}>
            <div className={styles.picker__circle} />
            <div className={styles.picker__options}>
                <CircularCarousel
                    items={slides}
                    itemWidth={146}
                    itemHeight={100}
                />
            </div>
        </div>
    );
};