"use client";

import { AnimatePresence, motion } from "motion/react";
import { Checkbox, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { Controller } from "react-hook-form";
import { CreateEventFormSchemaValues } from "@/features/event/create";

import styles from "./styles.module.scss";

export namespace SearchInterestsSelected {
    export type Props = {
        interests: CreateEventFormSchemaValues["interests"] | undefined;
    };
}

export const SearchInterestsSelected = ({
    interests,
}: SearchInterestsSelected.Props) => {
    return (
        <AnimatePresence>
            {
                (interests && interests.length > 0) && (
                    <motion.div
                        initial={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            type: "tween",
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <Section
                            title={"Selected interests"}
                            className={styles.search__gap}
                        >
                            <OptionsList>
                                {
                                    interests.map((_, index: number) => (
                                        <Controller
                                            name={"interests"}
                                            render={({ field }) => (
                                                <OptionsListItem
                                                    label={"Shopping"}
                                                    contentLeft={"🛍️"}
                                                    contentRight={<Checkbox checked />}
                                                    style={{ transition: "all" }}
                                                    onClick={() => {
                                                        field.onChange(
                                                            field.value.filter((item: number) => item !== index),
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    ))
                                }
                            </OptionsList>
                        </Section>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
};