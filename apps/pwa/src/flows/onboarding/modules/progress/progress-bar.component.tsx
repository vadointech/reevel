"use client";

import { useMemo } from "react";
import { useOnboardingProgress } from "@/features/onboarding/hooks";

import { IconArrowLeft, IconClose } from "@/components/icons";
import { Button, Header } from "@/components/ui";

import styles from "./styles/progress-bar.module.scss";
import { cx } from "class-variance-authority";

export namespace OnboardingProgressBar {
    export type Props = {
        step: number;
    };
}

export const OnboardingProgressBar = ({ step }: OnboardingProgressBar.Props) => {

    const {
        handleSkipStep,
        handlePrevStep,
        handleQuitOnboarding,
    } = useOnboardingProgress();

    const isFirstStep = step === 0;

    const ControlBefore = useMemo(() => {
        return step === 0 ? <IconClose /> : <IconArrowLeft />;
    }, [isFirstStep]);

    const ControlAfter = (
        <Button
            variant={"text-primary"}
            onClick={handleSkipStep}
        >
            Skip
        </Button>
    );

    return (
        <Header
            controlBefore={ControlBefore}
            controlAfter={ControlAfter}
            onControlBeforeClick={isFirstStep ? handleQuitOnboarding : handlePrevStep}
        >
            <div className={styles.indicator}>
                {
                    new Array(4).fill(null).map((_, i) => (
                        <div
                            key={i}
                            className={cx(
                                styles.indicator__item,
                                i <= step && styles.indicator__item_active,
                            )}
                        />
                    ))
                }
            </div>
        </Header>
    );
};
