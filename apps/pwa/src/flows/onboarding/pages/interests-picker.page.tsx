import { headers } from "next/headers";

import { getInitialInterests } from "@/api/interests";
import { getCurrentUserInterests } from "@/api/user";

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
    const initialInterestsResponse = await getInitialInterests({
        nextHeaders: await headers(),
    });
    const initialInterests = initialInterestsResponse.data || [];

    const currentInterestsResponse= await getCurrentUserInterests({
        nextHeaders: await headers(),
    });
    const currentInterests = currentInterestsResponse.data?.map(item => item.interest) || [];

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
                    className={styles.page__info}
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