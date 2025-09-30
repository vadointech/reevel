import { EditProfileAvatarUploadPage } from "@/flows/profile-edit/pages";

export default function Page() {
    return (
        <EditProfileAvatarUploadPage callbackUrl={"/profile/edit"} />
    );
}