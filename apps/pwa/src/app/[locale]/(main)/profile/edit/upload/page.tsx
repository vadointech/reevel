import { EditProfileAvatarUploadPage } from "@/flows/profile-edit/pages/avatar-upload.page";

export default function Page() {
    return (
        <EditProfileAvatarUploadPage callbackUrl={"/profile/edit"} />
    );
}