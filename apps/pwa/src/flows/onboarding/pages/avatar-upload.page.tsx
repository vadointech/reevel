import { UploadCropperView } from "@/components/screens/upload";
import { OnboardingAvatarUploadCropper } from "@/flows/onboarding/modules/avatar-picker";

export namespace OnboardingAvatarUploadPage {
    export type Props = {
        callbackUrl: string;
    };
}

export const OnboardingAvatarUploadPage = ({ callbackUrl }: OnboardingAvatarUploadPage.Props) => {
    return (
        <UploadCropperView
            circularCrop
            title={"Upload photo"}
            callbackUrl={callbackUrl}
        >
            <OnboardingAvatarUploadCropper callbackUrl={callbackUrl} />
        </UploadCropperView>
    );
};