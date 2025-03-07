"use client";

import { Avatar } from "@/components/ui";
import { useAvatarPicker } from "@/features/onboarding";
import { CircularCarousel } from "@/components/shared";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";
import { useCircularCarousel } from "@/components/shared/circular-carousel/hooks";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";

const SliderItem = ({ src }: { src?: string }) => {
    return <Avatar src={src} size={100} />;
};

export namespace OnboardingAvatarPicker {
    export type Props = {
        defaultAvatars: string[]
    };
}

export const OnboardingAvatarPicker = observer(({
    defaultAvatars,
}: OnboardingAvatarPicker.Props) => {

    const {
        avatars,
        handleSetAvatar,
    } = useAvatarPicker(defaultAvatars);

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
                <CircularCarousel carousel={carousel} />
            </div>
        </div>
    );
});