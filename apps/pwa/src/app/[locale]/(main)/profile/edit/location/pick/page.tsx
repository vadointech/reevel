import { EditProfileLocationPickerPage } from "@/flows/profile-edit/pages";

export const revalidate = 3600;

export default async function Page() {
    return (
        <EditProfileLocationPickerPage />
    );
}