"use client";

import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { OnboardingFormContext } from "./onboarding-form.context";
import { onboardingFormSchema } from "./onboarding-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormConfigParams } from "./types";
import { OnboardingFormStore } from "@/features/onboarding/onboarding-form.store";
import { useMobxStore } from "@/lib/mobx";

export namespace OnboardingFormProvider {
    export type Props = PropsWithChildren<OnboardingFormConfigParams>;
}

export const OnboardingFormProvider = ({
    children,
    ...config
}: OnboardingFormProvider.Props) => {

    const form = useForm({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: config.defaultValues,
        mode: "onSubmit",
    });

    const store = useMobxStore(OnboardingFormStore, config);

    return (
        <OnboardingFormContext value={{ ...form, store }}>
            <FormProvider {...form}>
                { children }
            </FormProvider>
        </OnboardingFormContext>
    );
};
