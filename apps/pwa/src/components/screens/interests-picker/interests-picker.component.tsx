"use client";

import { useEffect } from "react";
import { reaction } from "mobx";

import { motion, Transition, useAnimation } from "motion/react";

import { Container } from "@/components/ui";
import { InterestsPickerSearch } from "./primitives/search.component";
import { SearchInterestsSelected } from "./primitives/selected-interests.component";
import { SearchInterestsAll } from "./primitives/all-interests.component";
import { useInterestsPickerContext } from "@/features/interests/picker";

import styles from "./styles.module.scss";

export namespace InterestsPickerContent {
    export type Props = never;
}

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeOut",
};

export const InterestsPickerContent = () => {
    const selectedSectionAnimate = useAnimation();
    const { store } = useInterestsPickerContext();

    useEffect(() => {
        const disposer = reaction(
            () => store.searchTerm,
            (searchTerm) => {
                if(searchTerm.length > 0) {
                    selectedSectionAnimate.start({ opacity: 0, y: -10, height: 0 }, TRANSITION_PARAMS);
                } else {
                    selectedSectionAnimate.start({ opacity: 1, y: 0, height: "auto" }, TRANSITION_PARAMS);
                }
            },
        );

        return () => disposer();
    }, []);

    return (
        <div className={styles.search}>
            <InterestsPickerSearch />
            <Container className={styles.search__list}>
                <motion.div animate={selectedSectionAnimate}>
                    <SearchInterestsSelected />
                </motion.div>
                <SearchInterestsAll />
            </Container>
        </div>
    );
};