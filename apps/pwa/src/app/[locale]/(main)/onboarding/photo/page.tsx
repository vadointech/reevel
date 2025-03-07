import { NextStepButton, OnboardingProgress, OnboardingTextBlock } from "../_components";
import { OnboardingAvatarPicker, OnboardingPhotoUploader } from "./_components";
import { ArrowBack } from "@/components/icons";
import { Container } from "@/components/ui";

import styles from "./styles.module.scss";

const defaultPictures = [
    "http://localhost:3000/assets/temp/carousel1.jpg",
    "http://localhost:3000/assets/temp/carousel3.jpg",
    "http://localhost:3000/assets/temp/carousel5.jpg",
    "http://localhost:3000/assets/temp/carousel7.jpg",
    "http://localhost:3000/assets/temp/carousel2.jpg",
];

export default function Page() {
    return (
        <>
            <Container>
                <OnboardingProgress step={0} />
            </Container>
            <Container>
                <OnboardingTextBlock
                    title={"Show Off Yourself!"}
                    subtitle={"You can select photo from the list below or add you own photo as profile picture"}
                    className={styles.page__text}
                />

                <OnboardingAvatarPicker defaultAvatars={defaultPictures} />
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