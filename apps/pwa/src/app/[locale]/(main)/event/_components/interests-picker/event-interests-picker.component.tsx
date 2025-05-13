"use client";

import { observer } from "mobx-react-lite";
import { TabButton } from "@/components/ui/tab-button";
import { useInterestPicker } from "@/features/event/hooks/use-interest-picker.hook";
import { useEventStore } from "@/features/event";
import { InterestEntity } from "@/entities/interests";

import styles from "./styles.module.scss"
import cx from "classnames"

import { Section, SectionItems } from "@/components/shared/section";
import { ComponentProps, useState } from "react";
import { InterestsSearch } from "../interests-search/interests-search.component";
import { AnimatePresence, motion } from "motion/react";
import { getUserWindow } from "./user-window";

export namespace EventInterestsPicker {
    export type Props = ComponentProps<"div"> & {
        userInterests: InterestEntity[]
        initialInterests: InterestEntity[]
    };
}

export const EventInterestsPicker = observer(({ userInterests, initialInterests, className }: EventInterestsPicker.Props) => {
    const eventStore = useEventStore()

    const { interests, handlePickInterest } = useInterestPicker(userInterests)
    const [showInterests, setShowInterests] = useState(false)

    return (
        <>
            <Section title="Interests" onClick={() => setShowInterests(true)} type="See all" className={cx(styles.section, className)}>
                <SectionItems variant="flex">
                    {interests?.map((interest) => (
                        <InterestItem
                            interest={interest}
                            key={interest.slug}
                            {...interest}
                            selected={eventStore.interests.some((item) => item.slug === interest.slug)}
                            handlePickInterest={handlePickInterest}
                        />
                    ))}
                </SectionItems>
            </Section >

            <AnimatePresence>
                {showInterests &&
                    <motion.div
                        className={styles.search}
                        initial={{ y: 0, x: getUserWindow(), opacity: 0 }}
                        animate={{ y: 0, x: 0, opacity: 1 }}
                        exit={{ y: 0, x: getUserWindow(), opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <InterestsSearch onClose={() => setShowInterests(false)} initialInterests={initialInterests ?? []} />

                    </motion.div>
                }
            </AnimatePresence>
        </>
    );
});

const InterestItem = observer((
    { selected, handlePickInterest, interest }: {
        selected: boolean;
        handlePickInterest: (interest: InterestEntity) => void;
        interest: InterestEntity;
    }
) => {
    return (
        <TabButton
            selected={selected}
            key={interest.slug}
            name={interest.title_en}
            icon={interest.icon}
            onClick={() => handlePickInterest(interest)}
        />
    );
});
