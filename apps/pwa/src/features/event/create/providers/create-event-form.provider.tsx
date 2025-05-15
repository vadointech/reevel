"use client";

import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEventFormSchema, CreateEventFormSchemaValues } from "@/features/event/create";

export namespace CreateEventFormProvider {
    export type Data = CreateEventFormSchemaValues;
    export type Props = PropsWithChildren<{
        defaultValues?: Data;
    }>;
}

export const CreateEventFormProvider = ({ children, defaultValues }: CreateEventFormProvider.Props) => {
    const form = useForm<CreateEventFormSchemaValues>({
        resolver: zodResolver(createEventFormSchema),
        defaultValues,
        mode: "onBlur",
    });

    return (
        <FormProvider {...form}>
            { children }
        </FormProvider>
    );
};