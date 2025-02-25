import { NextStepButton, OnboardingTextBlock } from "../_components";
import { OnboardingAvatarPicker, OnboardingPhotoUploader } from "./_components";
import { ArrowBack } from "@/components/icons";
import { Container } from "@/components/ui";

import styles from "./styles.module.scss";
export default function Page() {
    return (
        <>
            <Container>
                <OnboardingTextBlock
                    title={"Show Off Yourself!"}
                    subtitle={"You can select photo from the list below or add you own photo as profile picture"}
                    className={styles.page__text}
                />

                <OnboardingAvatarPicker />
            </Container>

            <Container className={styles.page__buttons}>
                <OnboardingPhotoUploader />
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