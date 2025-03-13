"use client";

import { ArrowBack } from "@/components/icons";
import { Avatar, Container } from "@/components/ui";
import { NextStepButton, OnboardingBioForm, OnboardingProgress, OnboardingTextBlock } from "../_components";
import { useOnboardingStore } from "@/features/onboarding/stores/onboarding.store";

import styles from "./styles.module.scss";

export default function Page() {
    const onboardingStore = useOnboardingStore();
    return (
        <>
            <Container>
                <OnboardingProgress step={1} />
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
                <NextStepButton
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </NextStepButton>
            </Container>
        </>
    );
};