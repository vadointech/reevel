"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton } from "@/components/ui";
import { EditProfileFormSchemaValues } from "@/features/profile/update";
import { useFormInterestsPicker } from "@/features/interests/picker/hooks";

import styles from "../styles/interests-picker.module.scss";

export namespace EditProfileFormInterestsPicker {
    export type Props = never;
}

export const EditProfileFormInterestsPicker = () => {
    const {
        interests,
    } = useFormInterestsPicker<EditProfileFormSchemaValues>();

    return (
        <Controller<EditProfileFormSchemaValues, "interests">
            name={"interests"}
            render={({ fieldState }) => {
                return (
                    <FormField state={fieldState}>
                        <div className={styles.interestsPicker}>
                            {
                                interests.map(item => (
                                    <InterestButton
                                        key={item.slug}
                                        icon={item.icon}
                                    >
                                        {item.title_en}
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