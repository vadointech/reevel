"use client";

import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { indexedDbService } from "@/lib/indexed-db.service";

import { editProfileFormSchema, EditProfileFormSchemaValues } from "@/features/profile/edit";

export namespace EditProfileFormProvider {
    export type Props = PropsWithChildren<Partial<EditProfileFormSchemaValues>>;
}

export const EditProfileFormProvider = ({ children, ...defaultValues }: EditProfileFormProvider.Props) => {
    const form = useForm<EditProfileFormSchemaValues>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            fullName: "",
            bio: "",
            background: "",
            picture: "",
            interests: [],
            location: undefined as any,
            ...defaultValues,
        },
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

    return (
        <FormProvider {...form}>
            {children}
        </FormProvider>
    );
};