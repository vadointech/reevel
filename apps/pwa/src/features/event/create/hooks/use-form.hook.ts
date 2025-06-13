"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useFormContext } from "react-hook-form";
import { indexedDbService } from "@/lib/indexed-db.service";

import { CreateEventFormSchemaValues } from "@/features/event/create";

type Params = {
    nextStepUrl: string;
};

export function useCreateEventForm(params: Params) {
    const router = useRouter();
    const form = useFormContext<CreateEventFormSchemaValues>();

    const handleSubmit = form.handleSubmit(() => {
        router.push(params.nextStepUrl);
    });

    useEffect(() => {
        return () => {
            form.clearErrors();

            const formValues = form.getValues();
            indexedDbService.setItem("event_form_values", formValues);
        };
    }, []);

    return {
        handleSubmit,
    };
}