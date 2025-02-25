"use client";

import { Button } from "@/components/ui";
import { useOnboardingProgress } from "@/app/[locale]/onboarding/_components";

export const OnboardingLocationRequest = () => {
    const { handleSetStep } = useOnboardingProgress();

    return (
        <Button
            variant={"primary"}
            onClick={() => handleSetStep("/onboarding/location/confirm")}
        >
            Allow Location Access
        </Button>
    );
};