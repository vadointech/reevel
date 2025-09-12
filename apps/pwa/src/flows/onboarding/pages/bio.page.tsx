"use client";

import { useSessionContext } from "@/features/session";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingProfileBioForm } from "../modules/profile-bio";
import { OnboardingTextBlock } from "../modules/text-block";
import { Avatar, ButtonsBlock, Container } from "@/components/ui";

import styles from "../styles/bio-page.module.scss";

export namespace OnboardingBioPage {
    export type Props = never;
}

export function OnboardingBioPage() {
    const session = useSessionContext();
    return (
        <>
            <OnboardingProgressBar step={1} />
            <Container>
                <div className={styles.page__info}>
                    <div className={styles.page__avatar}>
                        <Avatar image={session.store.user?.profile.picture} variant={"outline"} />
                    </div>
                    <OnboardingTextBlock
                        title={"Tell us About Yourself"}
                        subtitle={"Share your name and a bit about yourself to make your profile unique."}
                    />
                </div>
                <OnboardingProfileBioForm />
            </Container>

            <ButtonsBlock>
                <OnboardingNextStepButton>
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}
