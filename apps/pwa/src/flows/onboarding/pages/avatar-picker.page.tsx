import { Container } from "@/components/ui";
import { ArrowBack } from "@/components/icons";

import { OnboardingProgressBar, OnboardingNextStepButton } from "../modules/progress";
import { OnboardingAvatarPickerCarousel, OnboardingPhotoUploader } from "../modules/avatar-picker";
import { OnboardingTextBlock } from "../modules/text-block";

import styles from "../styles/avatar-picker-page.module.scss";

const defaultPictures = [
    "http://localhost:3000/assets/temp/carousel1.jpg",
    "http://localhost:3000/assets/temp/carousel3.jpg",
    "http://localhost:3000/assets/temp/carousel5.jpg",
    "http://localhost:3000/assets/temp/carousel7.jpg",
    "http://localhost:3000/assets/temp/carousel2.jpg",
];


export namespace OnboardingAvatarPickerPage {
    export type Props = never;
}

export function OnboardingAvatarPickerPage() {
    return (
        <>
            <Container>
                <OnboardingProgressBar step={0} />
            </Container>
            <Container>
                <OnboardingTextBlock
                    title={"Show Off Yourself!"}
                    subtitle={"You can select photo from the list below or add you own photo as profile picture"}
                    className={styles.page__text}
                />

                <OnboardingAvatarPickerCarousel defaultAvatars={defaultPictures} />
            </Container>

            <Container className={styles.page__buttons}>
                <OnboardingPhotoUploader />
                <OnboardingNextStepButton
                    variant={"primary"}
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </OnboardingNextStepButton>
            </Container>
        </>
    );
};

