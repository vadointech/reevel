"use client";

import { AnimatePresence, motion } from "motion/react";
import { observer } from "mobx-react-lite";
import { OptionsList, Section } from "@/components/shared/_redesign";
import { useInterestsPicker } from "@/features/interests";

import { InterestsPickerScreenListItem } from "./list-item.component";
import { useInterestsPickerStore } from "@/features/interests/interests-picker/interests-picker.store";
import { InterestEntity } from "@/entities/interests";

import styles from "../styles.module.scss";

export namespace SearchInterestsSelected {
    export type Props = never;

    export type ListProps = {
        handleRemove: (item: InterestEntity) => void
    };
}

const animationVariants = {
    initial: { opacity: 0, y: -10, height: 0, overflow: "hidden" },
    animate: {
        opacity: 1,
        y: 0,
        height: "auto",
        transition: {
            duration: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        height: 0,
        overflow: "hidden",
        transition: {
            duration: 0.15,
            ease: [0.6, -0.28, 0.735, 0.045],
        },
    },
};

export const SearchInterestsSelected = () => {
    const {
        handleRemoveInterest,
    } = useInterestsPicker();
    return (
        <AnimatePresence>
            <List handleRemove={handleRemoveInterest} />
        </AnimatePresence>
    );
};

const List = observer(({ handleRemove }: SearchInterestsSelected.ListProps) => {
    const interestsPickerStore = useInterestsPickerStore();

    if(interestsPickerStore.selectedInterests.length === 0) return;

    return (
        <motion.div
            variants={animationVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            style={{ overflow: "hidden" }}
        >
            <Section
                title={"Selected interests"}
                className={styles.search__gap}
            >
                <OptionsList style={{ gap: 0 }}>
                    <AnimatePresence>
                        {
                            interestsPickerStore.selectedInterests.map((item) => (
                                <InterestsPickerScreenListItem
                                    key={item.slug}
                                    interest={item}
                                    selected={true}
                                    onClick={() => handleRemove(item)}
                                />
                            ))
                        }
                    </AnimatePresence>
                </OptionsList>
            </Section>
        </motion.div>
    );
});