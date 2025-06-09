import { CreateEventPreviewPage } from "@/flows/create-event/pages";

export default async function Page() {
    return (
        <CreateEventPreviewPage
            callbackUrl={"/event/public/create"}
            cropperUrl={"/event/public/create/upload"}
        />
    );
}