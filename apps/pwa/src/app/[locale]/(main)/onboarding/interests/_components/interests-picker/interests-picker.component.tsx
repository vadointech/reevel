"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import { InterestCard } from "@/components/shared";
import { GetInitialInterests } from "@/api/interests";
import { useInterestPicker, useOnboardingStore } from "@/features/onboarding";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

export namespace OnboardingInterestsPicker {
    export type Props = {
        interests: GetInitialInterests.TOutput
    };
}

export const OnboardingInterestsPicker = observer(({
    interests: interestsInit,
}: OnboardingInterestsPicker.Props) => {
    const {
        interests,
        handlePickInterest,
    } = useInterestPicker(interestsInit);

    const onboardingStore = useOnboardingStore();

    return (
        <div className={styles.picker}>
            {
                interests.map((interest) => (
                    <ViewTransition
                        key={interest.slug}
                        name={interest.slug}
                    >
                        <InterestItem
                            {...interest}
                            key={interest.slug}
                            selected={onboardingStore.interests.includes(interest.slug)}
                            handlePickInterest={handlePickInterest}
                        />
                    </ViewTransition>
                ))
            }
        </div>
    );
});

const InterestItem = observer((
    { selected, handlePickInterest, ...interest }: GetInitialInterests.TOutput[number] & {
        selected: boolean;
        handlePickInterest: (slug: string) => void
    },
) => {
    return (
        <InterestCard
            selected={selected}
            icon={interest.icon}
            text={interest.title_en}
            onChange={() => handlePickInterest(interest.slug)}
        />
    );
});
