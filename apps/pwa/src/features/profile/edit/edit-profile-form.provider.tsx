"use client";

import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { indexedDbService } from "@/lib/indexed-db.service";

import { editProfileFormSchema, EditProfileFormSchemaValues } from "@/features/profile/edit";
import { EditProfileFormConfigParams } from "./types/config";
import { EditProfileFormContext } from "./edit-profile-form.context";
import { useMobxStore } from "@/lib/mobx";
import { EditProfileFormStore } from "./edit-profile-form.store";

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


    useEffect(() => {
        const formValues = form.getValues();
        const validatedFormValues = editProfileFormSchema.safeParse(formValues);

        if (validatedFormValues.success) return;

        indexedDbService.getItem<EditProfileFormSchemaValues>("event_form_values")
            .then(data => {
                if (data) {
                    for (const key of Object.keys(data) as (keyof EditProfileFormSchemaValues)[]) {
                        form.setValue(key, data[key]);
                    }
                }
            });
    }, []);

    const store = useMobxStore(EditProfileFormStore, config);

    return (
        <FormProvider {...form}>
            <EditProfileFormContext.Provider value={{ ...form, store }}>

                {children}
            </EditProfileFormContext.Provider>
        </FormProvider>
    );
};