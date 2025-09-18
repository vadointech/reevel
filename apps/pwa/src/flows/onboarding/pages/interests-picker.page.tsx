import { getInitialInterests } from "@/api/interests/server";
import { getCurrentUserInterests } from "@/api/user/server";

import { ObjectUnique } from "@/utils/object";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingInterestsPicker } from "../modules/interests-picker";
import { InterestsPickerProvider } from "@/features/interests/picker";

import { ButtonsBlock } from "@/components/ui";

import styles from "../styles/interests-picker-page.module.scss";

export namespace OnboardingInterestsPickerPage {
    export type Props = never;
}

export async function OnboardingInterestsPickerPage() {
    const initialInterests = await getInitialInterests();
    const currentInterests = await getCurrentUserInterests();

    const interests = [
        ...new ObjectUnique([
            ...initialInterests,
            ...currentInterests,
        ], "slug"),
    ];

    return (
        <>
            <OnboardingProgressBar step={2} />

            <div className={styles.page__content}>
                <OnboardingTextBlock
                    title={"Customize Your Interests"}
                    subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                />
                <InterestsPickerProvider
                    interests={interests}
                    syncFormField={"interests"}
                    selectedInterests={currentInterests}
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