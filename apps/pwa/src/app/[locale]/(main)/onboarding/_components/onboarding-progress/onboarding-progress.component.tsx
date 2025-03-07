"use client";

import { ProgressBar } from "@/components/shared";
import { useOnboardingProgress } from "@/features/onboarding";

export namespace OnboardingProgress {
    export type Props = {
        step: number;
    };
}

export const OnboardingProgress = ({ step }: OnboardingProgress.Props) => {

    const {
        handleSkipStep,
        handlePrevStep,
        handleQuitOnboarding,
    } = useOnboardingProgress();

    const isFirstStep = step === 0;

    return (
        <ProgressBar
            stepCount={4}
            currentStep={step}
            type={isFirstStep ? "close" : "back"}
            onControlRightClick={handleSkipStep}
            onControlLeftClick={isFirstStep ? handleQuitOnboarding: handlePrevStep}
        />
    );
};
