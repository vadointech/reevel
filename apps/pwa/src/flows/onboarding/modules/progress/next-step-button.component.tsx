"use client";

import { observer } from "mobx-react-lite";

import { useOnboardingUpdate } from "@/features/onboarding/hooks";

import { Button } from "@/components/ui";
import { ArrowNext } from "@/components/icons";

export const OnboardingNextStepButton = observer((props: Button.Props) => {

    const {
        handleUpdateProfile,
    } = useOnboardingUpdate();

    return (
        <Button
            variant={"accent"}
            arrowAfter={<ArrowNext />}
            onClick={handleUpdateProfile}
            {...props}
        />
    );
});