import { Container } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { NextStepButton, OnboardingProgress, OnboardingTextBlock } from "../_components";
import { OnboardingInterestsPicker } from "./_components";

import styles from "./styles.module.scss";

export default function Page() {

    return (
        <>
            <Container>
                <OnboardingProgress />
            </Container>
            <Container>
                <div className={styles.page__info}>
                    <OnboardingTextBlock
                        title={"Customize Your Interests"}
                        subtitle={"Pick the things you’re passionate about so we can show events that match your interests."}
                    />
                </div>

                <div className={styles.page__interests}>
                    <OnboardingInterestsPicker />
                </div>
            </Container>

            <Container className={styles.page__buttons}>
                <NextStepButton
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </NextStepButton>
            </Container>
        </>
    );
}