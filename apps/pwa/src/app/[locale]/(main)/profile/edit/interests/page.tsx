import { EditProfileInterestsPickerPage } from "@/flows/profile-edit/pages/interests-picker.page";

export default async function CreateEventInterestsPage() {
    return (
        <EditProfileInterestsPickerPage callbackUrl={"/profile/edit"} />
    );
}