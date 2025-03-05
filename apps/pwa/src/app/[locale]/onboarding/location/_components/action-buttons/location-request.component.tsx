"use client";

import { Button } from "@/components/ui";
import { useLocationAccess } from "@/features/onboarding";

export const OnboardingLocationRequest = () => {

    const {
        handleRequestLocation,
    } = useLocationAccess();

    return (
        <Button
            variant={"primary"}
            onClick={handleRequestLocation}
        >
            Allow Location Access
        </Button>
    );
};