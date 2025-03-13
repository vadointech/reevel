"use client";

import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { useOnboardingUpdate } from "@/features/onboarding";

export const OnboardingConfirmLocation = () => {

    const {
        handleUpdateProfile,
    } = useOnboardingUpdate();

    return (
        <Button
            variant={"primary"}
            iconAfter={<ArrowBack />}
            onClick={handleUpdateProfile}
        >
            Yes, browse events
        </Button>
    );
};