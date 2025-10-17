"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton, InterestButtonSkeleton } from "@/components/ui";
import { useFormInterestsPicker } from "@/features/interests/picker/hooks";

import { CreateEventFormSchemaValues } from "@/features/event/create";

import styles from "../styles/interests-picker.module.scss";

export namespace CreateEventFormInterestsPicker {
    export type Props = never;
}

export const CreateEventFormInterestsPicker = () => {
    const {
        interests,
        isSelected,
        handleToggle,
        isLoading,
    } = useFormInterestsPicker<CreateEventFormSchemaValues>();
    return (
        <Controller<CreateEventFormSchemaValues, "interests">
            name={"interests"}
            render={({ field, fieldState }) => {
                return (
                    <FormField state={fieldState}>
                        <div className={styles.interestsPicker}>
                            {
                                isLoading
                                    ? [...new Array(3).keys()].map((item) => (
                                        <InterestButtonSkeleton key={`interest-button-skeleton-${item}`} />
                                    ))
                                    : interests.map(item => (
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