import { getInitialInterests } from "@/api/interests";
import { headers } from "next/headers";
import { Container } from "@/components/ui";
import { ArrowBack } from "@/components/icons";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingInterestsPicker } from "../modules/interests-picker";

import styles from "../styles/interests-picker-page.module.scss";

export namespace OnboardingInterestsPickerPage {
    export type Props = never;
}

export async function OnboardingInterestsPickerPage() {

    const { data } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    return (
        <>
            <Container>
                <OnboardingProgressBar step={2} />
            </Container>

            <Container>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    className={styles.page__info}
                />
                <OnboardingInterestsPicker interests={data || []} />
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