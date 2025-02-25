"use client";

import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/icons";

export const OnboardingConfirmLocation = () => {
    return (
        <Button
            variant={"primary"}
            iconAfter={<ArrowBack />}
        >
            Yes, browse events
        </Button>
    );
};