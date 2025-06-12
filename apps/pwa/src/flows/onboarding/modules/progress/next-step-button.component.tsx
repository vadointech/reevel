"use client";

import { observer } from "mobx-react-lite";
import { Button } from "@/components/shared/_redesign";
import { ArrowNext } from "@/components/icons";
import { useOnboardingUpdate } from "@/features/onboarding/hooks";

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