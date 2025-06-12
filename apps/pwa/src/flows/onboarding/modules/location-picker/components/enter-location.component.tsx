"use client";

import { Button } from "@/components/shared/_redesign";
import { useOnboardingProgress } from "@/features/onboarding/hooks";

export const OnboardingEnterLocationManually = () => {
    const { handleNextStep } = useOnboardingProgress();

    return (
        <Button
            variant={"accent-muted"}
            onClick={handleNextStep}
        >
            Enter Location Manually
        </Button>
    );
};