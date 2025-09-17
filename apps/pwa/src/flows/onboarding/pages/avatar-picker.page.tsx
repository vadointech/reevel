import { getCurrentUserUploads } from "@/api/user/uploads/server";

import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";
import {
    OnboardingAvatarPickerCarousel,
    OnboardingAvatarUploader,
} from "../modules/avatar-picker";
import { OnboardingTextBlock } from "../modules/text-block";
import { ButtonsBlock, Container } from "@/components/ui";
import { SupportedFileCollections } from "@/entities/uploads";

import styles from "../styles/avatar-picker-page.module.scss";

const defaultPictures = [
    "/assets/temp/carousel1.jpg",
    "/assets/temp/carousel3.jpg",
    "/assets/temp/carousel5.jpg",
    "/assets/temp/carousel7.jpg",
    "/assets/temp/carousel2.jpg",
];

export namespace OnboardingAvatarPickerPage {
    export type Props = {
        cropperPageUrl: string;
    };
}

export async function OnboardingAvatarPickerPage({ cropperPageUrl }: OnboardingAvatarPickerPage.Props) {
    const uploads = await getCurrentUserUploads({
        collection: SupportedFileCollections.PROFILE_PICTURE,
    });

    return (
        <>
            <OnboardingProgressBar step={0} />
            <Container>
                <OnboardingTextBlock
                    title={"Show Off Yourself!"}
                    subtitle={"You can select photo from the list below or add you own photo as profile picture"}
                    className={styles.text}
                />
                <OnboardingAvatarPickerCarousel defaultAvatars={defaultPictures} />
            </Container>
            <ButtonsBlock className={styles.buttons}>
                <OnboardingAvatarUploader
                    uploads={uploads}
                    cropperPageUrl={cropperPageUrl}
                />
                <OnboardingNextStepButton>
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}
