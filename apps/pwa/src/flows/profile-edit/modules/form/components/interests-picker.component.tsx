"use client";

import { Controller } from "react-hook-form";
import { FormField, InterestButton } from "@/components/ui";
import { EditProfileFormSchemaValues } from "@/features/profile/update";
import { useFormInterestsPicker } from "@/features/interests/picker/hooks";

import { InterestEntity } from "@/entities/interests";

import styles from "../styles/interests-picker.module.scss";


export namespace EditProfileFormInterestsPicker {
    export type Data = {
        interests: InterestEntity[]
    };
    export type Props = Data;
}

export const EditProfileFormInterestsPicker = ({
    interests: interestsInit,
}: EditProfileFormInterestsPicker.Props) => {
    const {
        interests,
    } = useFormInterestsPicker<EditProfileFormSchemaValues>(interestsInit);

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