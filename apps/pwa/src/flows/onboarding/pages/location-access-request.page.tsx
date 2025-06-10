import { Container } from "@/components/ui";

import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingProgressBar } from "../modules/progress";
import { OnboardingEnterLocationManually, OnboardingLocationRequest } from "../modules/location-picker";

import styles from "../styles/location-access-request-page.module.scss";

export namespace OnboardingLocationAccessRequestPage {
    export type Props = never;
}

export function OnboardingLocationAccessRequestPage() {
    return (
        <>
            <Container>
                <OnboardingProgressBar step={3} />
            </Container>
            <Container>
                <div
                    className={styles.icon}
                >
                    <span>
                        📍
                    </span>
                </div>
                <OnboardingTextBlock
                    title={"What is Your Location?"}
                    subtitle={"To find nearby events share your location with us"}
                    className={styles.page__text}
                />
            </Container>


            <Container className={styles.page__buttons}>
                <OnboardingEnterLocationManually />
                <OnboardingLocationRequest />
            </Container>
        </>
    );
}
