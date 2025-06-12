import { getInitialInterests } from "@/api/interests";
import { headers } from "next/headers";
import { ButtonsBlock } from "@/components/shared/_redesign";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingInterestsPicker } from "../modules/interests-picker";

import styles from "../styles/interests-picker-page.module.scss";
import { InterestsPickerProvider } from "@/features/interests/picker";

export namespace OnboardingInterestsPickerPage {
    export type Props = never;
}

export async function OnboardingInterestsPickerPage() {

    const { data } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    return (
        <>
            <OnboardingProgressBar step={2} />

            <div className={styles.page__content}>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    className={styles.page__info}
                />
                <InterestsPickerProvider
                    interests={data || []}
                    callbackUrl={"/onboarding/interests"}
                >
                    <OnboardingInterestsPicker />
                </InterestsPickerProvider>
            </div>

            <ButtonsBlock>
                <OnboardingNextStepButton>
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}