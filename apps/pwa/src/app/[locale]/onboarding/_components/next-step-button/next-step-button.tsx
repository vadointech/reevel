"use client";

import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui";
import { useOnboardingProgress } from "../onboarding-progress";

export const NextStepButton = observer((props: Button.Props) => {
    const { handleNext } = useOnboardingProgress();
    return <Button {...props} onClick={handleNext} />;
});