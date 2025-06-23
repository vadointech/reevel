"use client";

import { IconArrowNext } from "@/components/icons";
import { Button } from "@/components/ui";

export const OnboardingConfirmLocation = () => {

    return (
        <Button
            variant={"accent"}
            arrowAfter={<IconArrowNext />}
        >
            Yes, browse events
        </Button>
    );
};