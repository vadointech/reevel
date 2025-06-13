"use client";

import { useOnboardingProgress } from "@/features/onboarding/hooks";

import { Button } from "@/components/ui";

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