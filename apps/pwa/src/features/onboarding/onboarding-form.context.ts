"use client";

import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormSchemaValues } from "./onboarding-form.schema";
import { IOnboardingFormStore } from "./types";

export type OnboardingFormContextValues = UseFormReturn<OnboardingFormSchemaValues> & {
    store: IOnboardingFormStore;
};

export const OnboardingFormContext = createContext<OnboardingFormContextValues | null>(null);

export function useOnboardingFormContext() {
    const ctx = useContext(OnboardingFormContext);
    if (!ctx) throw new Error("useOnboardingFormContext must be used within a OnboardingFormProvider");
    return ctx;
}