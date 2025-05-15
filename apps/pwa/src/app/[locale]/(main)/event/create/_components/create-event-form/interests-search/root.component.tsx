"use client";

import { ComponentProps, useCallback, useRef } from "react";

import { useWatch } from "react-hook-form";
import { motion, useAnimation, Transition } from "motion/react";

import { Header } from "@/components/shared/_redesign";
import { Container } from "@/components/ui";

import { SearchInterestsAll } from "./all-interests.component";
import { SearchInterestsSelected } from "./selected-interests.component";
import { CreateEventFormSchemaValues } from "@/features/event/create";

import styles from "./styles.module.scss";

export namespace SearchInterests {
    export type Props = ComponentProps<"div">;
}

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.3,
    ease: "easeOut",
};

export const SearchInterests = ({ ...props }: SearchInterests.Props) => {
    const { interests } = useWatch<CreateEventFormSchemaValues>();
    const selectedAnimate = useAnimation();
    const allAnimate = useAnimation();

    const selectedRef = useRef<HTMLDivElement | null>(null);

    const handleFocus = useCallback(() => {
        selectedAnimate.start({ opacity: 0, visibility: "hidden" });
        if(selectedRef.current) {
            allAnimate.start({ y: -selectedRef.current.clientHeight  }, TRANSITION_PARAMS);
        }
    }, [selectedRef]);

    const handleBlur = useCallback(() => {
        selectedAnimate.start({ opacity: 1, visibility: "visible" });
        if(selectedRef.current) {
            allAnimate.start({ y: 0 }, TRANSITION_PARAMS);
        }
    }, [selectedRef]);

    return (
        <div className={styles.search}>
            <Header.Search
                className={styles.search__header}
                controlHref={"/event/create"}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <Container>
                <motion.div
                    ref={selectedRef}
                    animate={selectedAnimate}
                    initial={{ visibility: "visible"}}
                >
                    <SearchInterestsSelected interests={interests} />
                </motion.div>
                <motion.div
                    animate={allAnimate}
                    initial={{ y: 0 }}
                >
                    <SearchInterestsAll interests={interests} />
                </motion.div>
            </Container>
        </div>
    );
};
