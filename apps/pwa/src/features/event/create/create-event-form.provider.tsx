"use client";

import { PropsWithChildren, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { indexedDbService } from "@/lib/indexed-db.service";

import { createEventFormSchema, CreateEventFormSchemaValues } from "@/features/event/create";
import { EventVisibility } from "@/entities/event";

export namespace CreateEventFormProvider {
    export type Props = PropsWithChildren<Partial<CreateEventFormSchemaValues>>;
}

export const CreateEventFormProvider = ({ children, ...defaultValues }: CreateEventFormProvider.Props) => {
    const form = useForm<CreateEventFormSchemaValues>({
        resolver: zodResolver(createEventFormSchema),
        defaultValues: {
            visibility: EventVisibility.PRIVATE,
            title: "",
            description: "",
            poster: {
                id: "",
                fileUrl: "",
            }, // TODO: Default poster url
            interests: [],
            location: undefined as any,
            ticketsAvailable: "",
            ticketPrice: "",
            startDate: new Date(),
            startTime: undefined as any,
            endDate: undefined,
            endTime: undefined,
            ...defaultValues,
        },
        mode: "onChange",
    });

    useEffect(() => {
        const formValues = form.getValues();
        const validatedFormValues = createEventFormSchema.safeParse(formValues);

        if(validatedFormValues.success) return;

        indexedDbService.getItem<CreateEventFormSchemaValues>("event_form_values")
            .then(data => {
                if(data) {
                    for(const key of Object.keys(data) as (keyof CreateEventFormSchemaValues)[]) {
                        form.setValue(key, data[key]);
                    }
                }
            });
    }, []);

    return (
        <FormProvider {...form}>
            { children }
        </FormProvider>
    );
};