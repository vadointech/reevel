"use client";

import { useEffect } from "react";
import { ProgressBar } from "@/components/shared";
import { usePathname } from "next/navigation";
import { onboardingProgressStore } from "./onboarding-progress.store";
import { useOnboardingProgress } from "./useOnboardingProgress";
import { observer } from "mobx-react-lite";

export namespace OnboardingProgress {
    export type Props = {
        position?: "header" | "drawer"
    };
}

export const OnboardingProgress = observer(({
    position = "header",
}: OnboardingProgress.Props) => {
    const pathname = usePathname();
    const {
        step,
        handleSkip,
        handlePrev,
        handleQuit,
    } = useOnboardingProgress();

    useEffect(() => onboardingProgressStore.init(pathname), []);

    const isProgressBarHidden = position === "header" && (step === 4 || step === 5);
    const isFirstStep = step === 0;

    if(isProgressBarHidden) return <div />;

    return (
        <ProgressBar
            stepCount={4}
            currentStep={step}
            type={isFirstStep ? "close" : "back"}
            onControlRightClick={handleSkip}
            onControlLeftClick={isFirstStep ? handleQuit: handlePrev}
        />
    );
});
