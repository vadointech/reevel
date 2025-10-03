"use client";

import { PropsWithChildren } from "react";
import { FormProvider, useForm } from    "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editProfileFormSchema, EditProfileFormSchemaValues } from "@/features/profile/edit";
import { EditProfileFormContext } from "./edit-profile-form.context";
import { useMobxStore } from "@/lib/mobx";
import { EditProfileFormStore } from "./edit-profile-form.store";
import { EditProfileFormConfigParams } from "./types";

export namespace EditProfileFormProvider {
    export type Props = PropsWithChildren<EditProfileFormConfigParams>;
}

export const EditProfileFormProvider = ({
    children,
    ...config
}: EditProfileFormProvider.Props) => {
    const form = useForm<EditProfileFormSchemaValues>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: config.defaultValues,
        mode: "onChange",
    });

    const store = useMobxStore(EditProfileFormStore, config);

    return (
        <FormProvider {...form}>
            <EditProfileFormContext.Provider value={{ ...form, store }}>

                {children}
            </EditProfileFormContext.Provider>
        </FormProvider>
    );
};