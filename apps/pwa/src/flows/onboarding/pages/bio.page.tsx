"use client";


import { useOnboardingStore } from "@/features/onboarding";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingBioForm } from "../modules/form";
import { Avatar, ButtonsBlock, Container } from "@/components/ui";

import styles from "../styles/bio-page.module.scss";

export namespace OnboardingBioPage {
    export type Props = never;
}

export function OnboardingBioPage() {
    const onboardingStore = useOnboardingStore();
  
    return (
        <>
            <OnboardingProgressBar step={1} />
            <Container>
                <div className={styles.page__info}>
                    <div className={styles.page__avatar}>
                        <Avatar image={onboardingStore.picture} variant={"outline"} />
                    </div>
                    <OnboardingTextBlock
                        title={"Tell us About Yourself"}
                        subtitle={"Share your name and a bit about yourself to make your profile unique."}
                    />
                </div>
                <OnboardingBioForm />
            </Container>

            <ButtonsBlock>
                <OnboardingNextStepButton>
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}
