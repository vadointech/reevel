"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton, Section } from "@/components/shared/_redesign";

import styles from "../styles.module.scss";

export namespace CreateEventFormInterestsPicker {
    export type Props = never;
}

export const CreateEventFormInterestsPicker = () => {
    return (
        <Section
            title={"Interests"}
            cta={"See all"}
            ctaHref={"/event/create/interests"}
        >
            <Controller
                name={"interests"}
                render={({ field, fieldState }) => {
                    const exists = (id: number) => {
                        return field.value.includes(id);
                    };
                    const toggle = (id: number) => {
                        field.onChange(
                            exists(id)
                                ? field.value.filter((i: number) => i !== id)
                                : [...field.value, id],
                        );
                    };
                    return (
                        <FormField state={fieldState}>
                            <div className={styles.form__interests}>
                                {
                                    Array.from({ length: 8 }).map((_, id) => (
                                        <InterestButton
                                            key={id}
                                            variant={exists(id) ? "primary" : "default"}
                                            icon={"🥊"}
                                            onClick={() => toggle(id)}
                                        >
                                            Boxing
                                        </InterestButton>
                                    ))
                                }
                            </div>
                        </FormField>
                    );
                }}
            />
        </Section>
    );
};