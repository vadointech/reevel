"use client";

import { useOnboardingAvatarPickerCarousel } from "@/features/onboarding/hooks";
import { CircularCarousel } from "@/components/shared";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";
import { Avatar } from "@/components/shared/_redesign";

import styles from "../styles/avatar-picker-carousel.module.scss";

const SliderItem = ({ src }: { src?: string }) => {
    return <Avatar image={src} size={100} />;
};

export namespace OnboardingAvatarPickerCarousel {
    export type Props = {
        defaultAvatars: string[]
    };
}

export const OnboardingAvatarPickerCarousel = ({
    defaultAvatars,
}: OnboardingAvatarPickerCarousel.Props) => {

    const {
        avatars,
        handleSetAvatar,
    } = useOnboardingAvatarPickerCarousel(defaultAvatars);

    const slides = avatars.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const carousel = useCircularCarousel({
        items: slides,
        itemWidth: 146,
        itemHeight: 100,
        plugins: [ActiveScale],
        handlers: {
            onChange(carousel) {
                handleSetAvatar(
                    carousel.api.selectedScrollSnap(),
                );
            },
        },
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
                <CircularCarousel carousel={carousel} />;
            </div>
        </div>
    );
};