"use client";

import { Button } from "@/components/ui";
import { useOnboardingProgress } from "../onboarding-progress";

export const NextStepButton = (props: Button.Props) => {
    const { handleNext } = useOnboardingProgress();
    return <Button {...props} onClick={handleNext} />;
};