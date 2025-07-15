import { UploadCropperView } from "@/components/screens/upload";
import { CreateEventPosterUploadCropper } from "../modules/poster-upload";

export namespace CreateEventPosterUploadPage {
    export type Props = {
        callbackUrl: string;
    };
}

export const CreateEventPosterUploadPage = ({ callbackUrl }: CreateEventPosterUploadPage.Props) => {
    return (
        <UploadCropperView
            aspect={390/510}
            callbackUrl={callbackUrl}
        >
            <CreateEventPosterUploadCropper callbackUrl={callbackUrl} />
        </UploadCropperView>
    );
};
