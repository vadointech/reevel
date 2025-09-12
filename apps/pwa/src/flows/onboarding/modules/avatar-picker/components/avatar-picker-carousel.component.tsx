"use client";

import { useCallback, useEffect, useRef } from "react";
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
        defaultAvatars: string[];
    };
}

export const OnboardingAvatarPickerCarousel = observer(({
    defaultAvatars,
}: OnboardingAvatarPickerCarousel.Props) => {
    const form = useOnboardingFormContext();
    const controller = useRef<Carousel | null>(null);

    const _forceRerender = form.store.version;
    const pictureToSelect = form.store.pictureToSelect;

    const avatars = [
        pictureToSelect,
        ...defaultAvatars,
        pictureToSelect,
        ...defaultAvatars,
    ];

    const slides = avatars.map((item) => (
        <SliderItem key={item} src={item} />
    ));

    const handleSlideChange = useCallback((carousel: Carousel) => {
        const snapIndex = carousel.api.selectedScrollSnap();
        if(!snapIndex || snapIndex < 0 || snapIndex >= avatars.length) return;
        form.setValue("picture", avatars[snapIndex]);
    }, []);


    if(controller.current) {
        const snapIndex = controller.current.api.selectedScrollSnap();

        const candidateIndexes = avatars
            .map((val, idx) => (val === pictureToSelect ? idx : -1))
            .filter(idx => idx !== -1);

        const nearestIndex = candidateIndexes.reduce((prev, curr) =>
            Math.abs(curr - snapIndex) < Math.abs(prev - snapIndex) ? curr : prev,
        );

        controller.current.api.scrollTo(nearestIndex);
    }

    useEffect(() => {
        return () => {
            form.store.setPictureToSelect(
                form.getValues("picture"),
            );
        };
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
                    externalController={controller}
                    onChange={handleSlideChange}
                />
            </div>
        </div>
    );
});