"use client";

import { useOnboardingUpdate } from "@/features/onboarding/hooks";

import { IconArrowNext } from "@/components/icons";
import { Button } from "@/components/ui";

export const OnboardingConfirmLocation = () => {

    const {
        handleUpdateProfile,
    } = useOnboardingUpdate();

    return (
        <Button
            variant={"accent"}
            arrowAfter={<IconArrowNext />}
            onClick={handleUpdateProfile}
        >
            Yes, browse events
        </Button>
    );
};