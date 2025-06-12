"use client";

import { ArrowNext } from "@/components/icons";
import { Button } from "@/components/shared/_redesign";
import { useOnboardingUpdate } from "@/features/onboarding/hooks";

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