import { Container } from "@/components/ui";
import { OnboardingProgressBar, OnboardingNextStepButton } from "../modules/progress";
import { OnboardingAvatarPickerCarousel, OnboardingPhotoUploader } from "../modules/avatar-picker";
import { OnboardingTextBlock } from "../modules/text-block";
import { ButtonsBlock } from "@/components/shared/_redesign";

import { getUserUploads } from "@/api/user/uploads";
import { headers } from "next/headers";
import { SupportedFileCollections } from "@/entities/uploads";

import styles from "../styles/avatar-picker-page.module.scss";

const defaultPictures = [
    "http://localhost:3000/assets/temp/carousel1.jpg",
    "http://localhost:3000/assets/temp/carousel3.jpg",
    "http://localhost:3000/assets/temp/carousel5.jpg",
    "http://localhost:3000/assets/temp/carousel7.jpg",
    "http://localhost:3000/assets/temp/carousel2.jpg",
];

export namespace OnboardingAvatarPickerPage {
    export type Props = {
        cropperPageUrl: string;
    };
}

export async function OnboardingAvatarPickerPage({ cropperPageUrl }: OnboardingAvatarPickerPage.Props) {
    const { data } = await getUserUploads({
        nextHeaders: await headers(),
        params: {
            collection: SupportedFileCollections.PROFILE_PICTURE,
        },
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
                <OnboardingPhotoUploader
                    uploads={data || []}
                    cropperPageUrl={cropperPageUrl}
                />
                <OnboardingNextStepButton>
                    Next step
                </OnboardingNextStepButton>
            </ButtonsBlock>
        </>
    );
}
