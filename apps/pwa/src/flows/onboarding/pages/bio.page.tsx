import { headers } from "next/headers";
import { getSession } from "@/api/user/server";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingProfileBioForm } from "../modules/profile-bio";
import { OnboardingTextBlock } from "../modules/text-block";
import { Avatar, ButtonsBlock, Container } from "@/components/ui";
import { GetCurrentUserProfile } from "@/api/user";

import styles from "../styles/bio-page.module.scss";

export namespace OnboardingBioPage {
    export type Props = never;
}

export async function OnboardingBioPage() {
    const { data } = await getSession({
        nextHeaders: await headers(),
    });

    return (
        <>
            <OnboardingProgressBar step={1} />
            <Container>
                <div className={styles.page__info}>
                    <div className={styles.page__avatar}>
                        <Avatar image={data?.profile?.picture} variant={"outline"} />
                    </div>
                    <OnboardingTextBlock
                        title={"Tell us About Yourself"}
                        subtitle={"Share your name and a bit about yourself to make your profile unique."}
                    />
                </div>
                <OnboardingProfileBioForm />
            </Container>

            <ButtonsBlock>
                <OnboardingNextStepButton
                    revalidateQueryOnSuccess={GetCurrentUserProfile.queryKey}
                >
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}
