"use client";

import { Button } from "@/components/ui";
import { observer } from "mobx-react-lite";
import { useOnboardingUpdate } from "@/features/onboarding";

export const OnboardingNextStepButton = observer((props: Button.Props) => {

    const {
        handleUpdateProfile,
    } = useOnboardingUpdate();

    return (
        <Button
            {...props}
            onClick={handleUpdateProfile}
        />
    );
});