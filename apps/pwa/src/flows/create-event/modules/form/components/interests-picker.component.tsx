"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton } from "@/components/shared/_redesign";

import { CreateEventFormSchemaValues, useCreateEventFormInterestsPicker } from "@/features/event/create";
import { InterestEntity } from "@/entities/interests";

import styles from "../styles/interests-picker.module.scss";

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
        <Controller<CreateEventFormSchemaValues, "interests">
            name={"interests"}
            render={({ field, fieldState }) => {
                return (
                    <FormField state={fieldState}>
                        <div className={styles.interestsPicker}>
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
    );
};