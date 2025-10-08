"use client";

import { useEffect } from "react";
import { reaction } from "mobx";

import { motion, Transition, useAnimation } from "motion/react";

import { SearchInterestsSelected } from "./primitives/selected-interests.component";
import { SearchInterestsAll } from "./primitives/all-interests.component";
import { useInterestsPickerContext } from "@/features/interests/picker";

import {
    SearchScreen,
    SearchScreenContent,
    SearchScreenSearchBar,
} from "@/components/screens/search";

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
    const { store, config } = useInterestsPickerContext();

    useEffect(() => {
        const disposer = reaction(
            () => store.searchTerm,
            (searchTerm) => {
                if (searchTerm.length > 0) {
                    selectedSectionAnimate.start(
                        { opacity: 0, y: -10, height: 0 },
                        TRANSITION_PARAMS,
                    );
                } else {
                    selectedSectionAnimate.start(
                        { opacity: 1, y: 0, height: "auto" },
                        TRANSITION_PARAMS,
                    );
                }
            },
        );

        return () => disposer();
    }, [selectedSectionAnimate, store.searchTerm]);

    return (
        <SearchScreen>
            <SearchScreenSearchBar
                controlHref={config.callbackUrl}
                onChange={(value) => store.setSearchTerm(value)}
            />
            <SearchScreenContent>
                <motion.div animate={selectedSectionAnimate}>
                    <SearchInterestsSelected />
                </motion.div>
                <SearchInterestsAll />
            </SearchScreenContent>
        </SearchScreen>
    );
};