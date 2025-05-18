"use client";

import { ComponentProps } from "react";

import { useFormContext } from "react-hook-form";
import { FormInterestsFieldSchema, InterestsPickerStoreProvider } from "@/features/interests/interests-picker";

import { InterestsPickerContent } from "./primitives/content.component";

import { GetInitialInterests } from "@/api/interests";

export namespace InterestsPickerScreen {
    export type Data = {
        interests: GetInitialInterests.TOutput;
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const InterestsPickerScreen = ({
    interests,
}: InterestsPickerScreen.Props) => {
    const form = useFormContext<FormInterestsFieldSchema>();
    const selectedInterests = form.getValues("interests");

    return (
        <InterestsPickerStoreProvider
            init={[
                { interests, selectedInterests },
                (interests) => {
                    form.setValue("interests", interests, {
                        shouldValidate: false,
                        shouldDirty: false,
                        shouldTouch: false,
                    });
                },
            ]}
        >
            <InterestsPickerContent />
        </InterestsPickerStoreProvider>
    );
};