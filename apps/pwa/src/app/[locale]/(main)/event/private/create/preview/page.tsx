import { CreateEventPreviewPage } from "@/flows/create-event/pages";

export default async function Page() {
    return (
        <CreateEventPreviewPage
            callbackUrl={"/event/private/create"}
            cropperUrl={"/event/private/create/upload"}
        />
    );
}