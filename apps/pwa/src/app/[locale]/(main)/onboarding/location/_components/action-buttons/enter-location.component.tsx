"use client";

import { Button } from "@/components/ui";
import { useOnboardingProgress } from "@/features/onboarding";

export const OnboardingEnterLocationManually = () => {
    const { handleNextStep } = useOnboardingProgress();

    return (
        <Button
            onClick={handleNextStep}
        >
            Enter Location Manually
        </Button>
    );
};