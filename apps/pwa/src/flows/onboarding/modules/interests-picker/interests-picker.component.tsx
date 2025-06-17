"use client";

import { observer } from "mobx-react-lite";
import { AnimatePresence, motion } from "motion/react";

import { useInterestsPickerContext } from "@/features/interests/picker";
import { useInterestsPicker, useRelatedInterests } from "@/features/interests/picker/hooks";
import { useOnboardingStore } from "@/features/onboarding";

import { InterestCard } from "@/components/ui";

import { InterestEntity } from "@/entities/interests";

import styles from "./styles.module.scss";

export namespace OnboardingInterestsPicker {
    export type Props = never;

    export type ListProps = {
        onSelect: (item: InterestEntity) => void
    };
}

export const OnboardingInterestsPicker = () => {
    const onboardingStore = useOnboardingStore();

    const {
        getRelated,
        removeRelated,
    } = useRelatedInterests();

    const {
        handleToggleInterest,
    } = useInterestsPicker({
        onSelect: ({ slug }) => getRelated(slug),
        onRemove: ({ slug }) => removeRelated(slug),
        onChange: (interests) => {
            onboardingStore.setInterests(interests.map(item => item.slug));
        },
    });

    return (
        <motion.div className={styles.picker} layout>
            <AnimatePresence mode="popLayout">
                <List onSelect={handleToggleInterest} />
            </AnimatePresence>
        </motion.div>
    );
};

const List = observer(({ onSelect }: OnboardingInterestsPicker.ListProps) => {
    const { store } = useInterestsPickerContext();

    return store.interests.map((interest, index) => (
        <motion.div
            key={interest.slug}
            layout
            initial={{
                opacity: 0,
                scale: 0.96,
                y: -10,
                filter: "blur(6px)",
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    delay: index * 0.03,
                },
            }}
            exit={{
                opacity: 0,
                scale: 0.96,
                y: -10,
                filter: "blur(6px)",
            }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                layout: { type: "spring", stiffness: 500, damping: 40 },
            }}
        >
            <InterestCard
                selected={store.selectedInterests.some((item) => item.slug === interest.slug)}
                icon={interest.icon}
                text={interest.title_en}
                onChange={() => onSelect(interest)}
            />
        </motion.div>
    ));
});