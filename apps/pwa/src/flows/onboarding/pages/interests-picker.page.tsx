import { getInitialInterests } from "@/api/interests";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingInterestsPicker } from "../modules/interests-picker";
import { InterestsPickerProvider } from "@/features/interests/picker";

import { ButtonsBlock } from "@/components/ui";

import styles from "../styles/interests-picker-page.module.scss";
import { API_URL } from "@/config/env.config";

export namespace OnboardingInterestsPickerPage {
    export type Props = never;
}

export async function OnboardingInterestsPickerPage() {
    const { data: initialInterests } = await getInitialInterests({
        baseURL: API_URL,
        fallback: [],
    });

    return (
        <>
            <OnboardingProgressBar step={2} />

            <div className={styles.page__content}>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                />
                <InterestsPickerProvider
                    interests={initialInterests}
                    syncFormField={"interests"}
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