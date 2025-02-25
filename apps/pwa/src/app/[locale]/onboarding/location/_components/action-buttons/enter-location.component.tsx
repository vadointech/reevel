"use client";

import { useOnboardingProgress } from "@/app/[locale]/onboarding/_components";
import { Button } from "@/components/ui";

export const OnboardingEnterLocationManually = () => {
    const { handleNext } = useOnboardingProgress();

    return (
        <Button
            onClick={handleNext}
        >
            Enter Location Manually
        </Button>
    );
};