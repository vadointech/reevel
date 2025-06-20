"use client";

import { FormProvider, useForm } from "react-hook-form";
import { OnboardingFormContext } from "./onboarding-form.context";
import { onboardingFormSchema, OnboardingFormSchemaValues } from "./onboarding-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";

export namespace OnboardingFormProvider {
    export type Props = PropsWithChildren<OnboardingFormSchemaValues>;
}

export const OnboardingFormProvider = ({
    children,
    ...defaultValues
}: OnboardingFormProvider.Props) => {

    const form = useForm({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues,
        mode: "onSubmit",
    });

    return (
        <OnboardingFormContext value={{ ...form, defaultValues }}>
            <FormProvider {...form}>
                { children }
            </FormProvider>
        </OnboardingFormContext>
    );
};
