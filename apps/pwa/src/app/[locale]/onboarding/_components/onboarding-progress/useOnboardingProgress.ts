"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onboardingProgressStore, OnboardingStepPath, onboardingSteps } from "./onboarding-progress.store";

export function useOnboardingProgress() {
    const router = useRouter();
    const pathname = usePathname();

    const step = onboardingSteps.indexOf(pathname as OnboardingStepPath);

    const handleSetStep = useCallback((step: OnboardingStepPath) => {
        onboardingProgressStore.setStep(step, router);
    }, []);

    const handleNext = useCallback(() => {
        onboardingProgressStore.nextStep(router);
    }, []);

    const handlePrev = useCallback(() => {
        onboardingProgressStore.prevStep(router);
    }, []);

    const handleSkip = useCallback(() => {
        onboardingProgressStore.skipStep(router);
    }, []);

    const handleQuit = useCallback(() => {
        console.log("quit");
    }, []);

    return {
        step,
        handleSetStep,
        handlePrev,
        handleNext,
        handleSkip,
        handleQuit,
    };
}