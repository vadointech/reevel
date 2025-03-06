"use client";

import { Header } from "@/components/shared/header";
import { IconClose } from "@/components/icons";
import { useOnboardingProgress } from "@/features/onboarding";

export const OnboardingLocationPickerHeader = () => {
    const { handlePrevStep } = useOnboardingProgress();

    return (
        <Header
            title={"Enter your location"}
            size={"default"}
            controlRight={<IconClose width={8} height={8} />}
            controlRightType={"button"}
            onControlLeftClick={handlePrevStep}
            onControlRightClick={handlePrevStep}
        />
    );
};