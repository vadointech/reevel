import { CreateEventPosterUploadPage } from "@/flows/create-event/pages";

export default function Page() {
    return (
        <CreateEventPosterUploadPage callbackUrl={"/event/private/create/preview"} />
    );
}