import { EditProfileInterestsPickerPage } from "@/flows/profile-edit/pages";

export default async function CreateEventInterestsPage() {
    return (
        <EditProfileInterestsPickerPage callbackUrl={"/profile/update"} />
    );
}