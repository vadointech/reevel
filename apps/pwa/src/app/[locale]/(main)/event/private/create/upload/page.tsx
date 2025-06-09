import { UploadCropperView } from "@/components/screens/upload";
import { UploadPosterCropper } from "@/app/[locale]/(main)/event/_components";

export default function CreateEventUploadPage() {
    return (
        <UploadCropperView callbackUrl={"/event/private/create/preview"}>
            <UploadPosterCropper callbackUrl={"/event/private/create/preview"} />
        </UploadCropperView>
    );
}