"use client";

import { useOnboardingLocationAccessRequest } from "@/features/onboarding/hooks";

import { Button } from "@/components/ui";

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