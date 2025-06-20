"use client";

import { createContext, useContext } from "react";
import { OnboardingFormSchemaValues } from "./onboarding-form.schema";
import { UseFormReturn } from "react-hook-form";

export type OnboardingFormContextValues = UseFormReturn<OnboardingFormSchemaValues> & {
    defaultValues: OnboardingFormSchemaValues;
};

export const OnboardingFormContext = createContext<OnboardingFormContextValues | null>(null);

export function useOnboardingFormContext() {
    const ctx = useContext(OnboardingFormContext);
    if (!ctx) throw new Error("useOnboardingFormContext must be used within a OnboardingFormProvider");
    return ctx;
}