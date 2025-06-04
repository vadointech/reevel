"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton, Section } from "@/components/shared/_redesign";

import { CreateEventFormSchemaValues, useCreateEventFormInterestsPicker } from "@/features/event/create";

import styles from "../styles.module.scss";
import { InterestEntity } from "@/entities/interests";

export namespace CreateEventFormInterestsPicker {
    export type Data = {
        interests: InterestEntity[]
    };
    export type Props = Data;
}

export const CreateEventFormInterestsPicker = ({
    interests: interestsInit,
}: CreateEventFormInterestsPicker.Props) => {
    const {
        interests,
        isSelected,
        handleToggle,
    } = useCreateEventFormInterestsPicker(interestsInit);
    return (
        <Section
            title={"Interests"}
            cta={"See all"}
            ctaHref={"/event/create/interests"}
        >
            <Controller<CreateEventFormSchemaValues, "interests">
                name={"interests"}
                render={({ field, fieldState }) => {
                    return (
                        <FormField state={fieldState}>
                            <div className={styles.form__interests}>
                                {
                                    interests.map(item => (
                                        <InterestButton
                                            key={item.slug}
                                            icon={item.icon}
                                            variant={isSelected(item) ? "primary" : "default"}
                                            onClick={() => handleToggle(field, item)}
                                        >
                                            { item.title_en }
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