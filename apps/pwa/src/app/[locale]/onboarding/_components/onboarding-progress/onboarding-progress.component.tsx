"use client";

import { Container } from "@/components/ui";
import { ProgressBar } from "@/components/shared";

export namespace OnboardingProgress {
    export type Props = {};
}

export const OnboardingProgress = ({}: OnboardingProgress.Props) => {
    return (
        <Container>
            <ProgressBar
                stepCount={4}
                currentStep={0}
            />
        </Container>
    );
};
