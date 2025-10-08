import { UploadCropperView } from "@/components/screens/upload";

import { EditProfileAvatarUploadCropper } from "../modules/avatar-picker";

export namespace EditProfileAvatarUploadPage {
    export type Props = {
        callbackUrl: string;
    };
}

export const EditProfileAvatarUploadPage = ({ callbackUrl }: EditProfileAvatarUploadPage.Props) => {
    return (
        <UploadCropperView
            cropShape={"round"}
            title={"Upload photo"}
            callbackUrl={callbackUrl}
        >
            <EditProfileAvatarUploadCropper callbackUrl={callbackUrl} />
        </UploadCropperView>
    );
};