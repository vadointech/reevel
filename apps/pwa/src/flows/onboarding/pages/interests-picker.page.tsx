import { headers } from "next/headers";

import { getInitialInterests } from "@/api/interests";
import { getCurrentUserInterests } from "@/api/user/get-interests";


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

    const { data } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    const { data: interests } = await getCurrentUserInterests({
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
                    selectedInterests={interests?.map(item => item.interest)}
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