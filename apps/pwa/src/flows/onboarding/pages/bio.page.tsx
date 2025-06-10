"use client";

import { Avatar, Container } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { useOnboardingStore } from "@/features/onboarding";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingBioForm } from "../modules/form";

import styles from "../styles/bio-page.module.scss";

export namespace OnboardingBioPage {
    export type Props = never;
}

export function OnboardingBioPage() {
    const onboardingStore = useOnboardingStore();
  
    return (
        <>
            <Container>
                <OnboardingProgressBar step={1} />
            </Container>
            <Container>
                <div className={styles.page__info}>
                    <div className={styles.page__circle}>
                        <Avatar src={onboardingStore.picture} size={140} />
                    </div>
                    <OnboardingTextBlock
                        title={"Tell us About Yourself"}
                        subtitle={"Share your name and a bit about yourself to make your profile unique."}
                    />
                </div>
                <OnboardingBioForm />
            </Container>

            <Container className={styles.page__buttons}>
                <OnboardingNextStepButton
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </OnboardingNextStepButton>
            </Container>
        </>
    );
}
