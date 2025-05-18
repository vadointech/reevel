import { memo, useEffect } from "react";

import { observer } from "mobx-react-lite";
import { AnimationControls, motion, Transition, useAnimation } from "motion/react";
import { useInterestsPickerStore } from "@/features/interests/picker";

import { Container } from "@/components/ui";
import { InterestsPickerSearch } from "./search.component";
import { SearchInterestsSelected } from "./selected-interests.component";
import { SearchInterestsAll } from "./all-interests.component";

import styles from "../styles.module.scss";

export namespace InterestsPickerContent {
    export type Props = never;
    export type ViewPortProps = {
        selectedSectionAnimate: AnimationControls,
    };
}

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeOut",
};

export const InterestsPickerContent = observer(() => {
    const selectedSectionAnimate = useAnimation();
    const interestsPickerStore = useInterestsPickerStore();

    useEffect(() => {
        if(interestsPickerStore.searchTerm.length > 0) {
            selectedSectionAnimate.start({ opacity: 0, y: -10, height: 0 }, TRANSITION_PARAMS);
        } else {
            selectedSectionAnimate.start({ opacity: 1, y: 0, height: "auto" }, TRANSITION_PARAMS);
        }
    }, [interestsPickerStore.searchTerm]);

    return <ViewPort selectedSectionAnimate={selectedSectionAnimate} />;
});

const ViewPort = memo(({ selectedSectionAnimate }: InterestsPickerContent.ViewPortProps) => {
    return (
        <div className={styles.search}>
            <InterestsPickerSearch />
            <Container className={styles.search__list}>
                <motion.div
                    animate={selectedSectionAnimate}
                    // initial={{ overflow: "hidden" }}
                >
                    <SearchInterestsSelected />
                </motion.div>
                <SearchInterestsAll />
            </Container>
        </div>
    );
});
