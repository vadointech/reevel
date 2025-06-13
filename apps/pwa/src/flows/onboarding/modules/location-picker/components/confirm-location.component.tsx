"use client";

import { useOnboardingUpdate } from "@/features/onboarding/hooks";

import { ArrowNext } from "@/components/icons";
import { Button } from "@/components/ui";

export const OnboardingConfirmLocation = () => {

    const {
        handleUpdateProfile,
    } = useOnboardingUpdate();

    return (
        <Button
            variant={"accent"}
            arrowAfter={<ArrowNext />}
            onClick={handleUpdateProfile}
        >
            Yes, browse events
        </Button>
    );
};