import { UploadCropperView } from "@/components/screens/upload";
import { UploadPosterCropper } from "@/app/[locale]/(main)/event/_components";

export default function CreateEventUploadPage() {
    return (
        <UploadCropperView callbackUrl={"/event/public/create/preview"}>
            <UploadPosterCropper callbackUrl={"/event/public/create/preview"} />
        </UploadCropperView>
    );
}