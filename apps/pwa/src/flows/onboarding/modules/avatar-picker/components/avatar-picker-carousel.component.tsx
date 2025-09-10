"use client";

import { useCallback } from "react";
import { observer } from "mobx-react-lite";

import { useOnboardingFormContext } from "@/features/onboarding";

import { CircularCarousel, Carousel } from "@/components/shared/circular-carousel";
import { ActiveScale } from "@/components/shared/circular-carousel/plugins";

import { Avatar } from "@/components/ui";

import styles from "../styles/avatar-picker-carousel.module.scss";

const SliderItem = ({ src }: { src?: string }) => {
    return <Avatar image={src} size={100} />;
};

export namespace OnboardingAvatarPickerCarousel {
    export type Props = {
        defaultAvatars: string[]
    };
}

export const OnboardingAvatarPickerCarousel = observer(({
    defaultAvatars,
}: OnboardingAvatarPickerCarousel.Props) => {
    const form = useOnboardingFormContext();

    const avatars = [form.store.pictureToSelect, ...defaultAvatars, form.store.pictureToSelect, ...defaultAvatars];

    const slides = avatars.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const handleSlideChange = useCallback((carousel: Carousel) => {
        const snapIndex = carousel.api.selectedScrollSnap();
        if(!snapIndex || snapIndex < 0 || snapIndex >= avatars.length) return;
        form.setValue("picture", avatars[snapIndex]);
    }, []);

    return (
        <div
            className={styles.picker}
            style={{
                height: 160,
            }}
        >
            <div className={styles.picker__circle} />
            <div className={styles.picker__options}>
                <CircularCarousel
                    slides={slides}
                    slideWidth={146}
                    slideHeight={100}
                    plugins={[ActiveScale]}
                    onChange={handleSlideChange}
                />
            </div>
        </div>
    );
});