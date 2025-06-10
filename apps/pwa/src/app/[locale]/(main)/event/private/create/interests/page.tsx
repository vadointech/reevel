import { CreateEventInterestsPickerPage } from "@/flows/create-event/pages";

export default async function CreateEventInterestsPage() {
    return (
        <CreateEventInterestsPickerPage callbackUrl={"/event/private/create"} />
    );
}