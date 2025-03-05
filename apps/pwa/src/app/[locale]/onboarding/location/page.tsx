import { Container } from "@/components/ui";
import { OnboardingEnterLocationManually, OnboardingLocationRequest } from "./_components";
import { OnboardingProgress, OnboardingTextBlock } from "../_components";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <Container>
                <OnboardingProgress step={3} />
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