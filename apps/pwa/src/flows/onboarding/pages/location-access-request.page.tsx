import { Container } from "@/components/ui";

import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingProgressBar } from "../modules/progress";
import { OnboardingEnterLocationManually, OnboardingLocationRequest } from "../modules/location-picker";
import { ButtonsBlock } from "@/components/ui";

import styles from "../styles/location-access-request-page.module.scss";

export namespace OnboardingLocationAccessRequestPage {
    export type Props = never;
}

export function OnboardingLocationAccessRequestPage() {
    return (
        <>
            <OnboardingProgressBar step={3} />
            <Container>
                <div className={styles.icon}>
                    <span>
                        📍
                    </span>
                </div>
                <OnboardingTextBlock
                    title={"What is Your Location?"}
                    subtitle={"To find nearby events share your location with us"}
                />
            </Container>

            <ButtonsBlock>
                <OnboardingEnterLocationManually />
                <OnboardingLocationRequest />
            </ButtonsBlock>
        </>
    );
}
