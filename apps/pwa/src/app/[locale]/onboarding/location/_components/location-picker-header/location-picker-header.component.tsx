"use client";

import { Header } from "@/components/shared/header";
import { IconClose } from "@/components/icons";
import { useOnboardingProgress } from "@/app/[locale]/onboarding/_components";

export const OnboardingLocationPickerHeader = () => {
    const { handlePrev } = useOnboardingProgress();

    return (
        <Header
            title={"Enter your location"}
            size={"default"}
            controlRight={<IconClose width={8} height={8} />}
            controlRightType={"button"}
            onControlLeftClick={handlePrev}
            onControlRightClick={handlePrev}
        />
    );
};