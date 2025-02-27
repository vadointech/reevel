"use client";

import { ProgressBar } from "@/components/shared";
import { useOnboardingProgress } from "./useOnboardingProgress";

export namespace OnboardingProgress {

}

export const OnboardingProgress = () => {
    const {
        step,
        handleSkip,
        handlePrev,
        handleQuit,
    } = useOnboardingProgress();

    const isFirstStep = step === 0;

    return (
        <ProgressBar
            stepCount={4}
            currentStep={step}
            type={isFirstStep ? "close" : "back"}
            onControlRightClick={handleSkip}
            onControlLeftClick={isFirstStep ? handleQuit: handlePrev}
        />
    );
};
