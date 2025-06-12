"use client";

import { Button } from "@/components/shared/_redesign";
import { useOnboardingLocationAccessRequest } from "@/features/onboarding/hooks";

export const OnboardingLocationRequest = () => {

    const {
        handleRequestLocationAccess,
    } = useOnboardingLocationAccessRequest();

    return (
        <Button
            variant={"accent"}
            onClick={handleRequestLocationAccess}
        >
            Allow Location Access
        </Button>
    );
};