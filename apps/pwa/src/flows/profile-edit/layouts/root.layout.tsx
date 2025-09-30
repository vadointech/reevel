import { PropsWithChildren } from "react";

import { ImageUploaderProvider } from "@/features/uploader/image";
import { EditProfileFormProvider, mapProfileLocationToForm } from "@/features/profile/edit";
import { getCurrentUserProfile } from "@/api/user/server";

export namespace EditProfileRootLayout {
    export type Props = PropsWithChildren;
}

export const EditProfileRootLayout = async ({
    children,
}: EditProfileRootLayout.Props) => {
    const profile = await getCurrentUserProfile();


    return (
        <EditProfileFormProvider
            pictureToSelect={profile?.picture || "/assets/defaults/avatar.png"}

            defaultValues={{
                background: "",
                avatar: profile?.picture || "",
                fullName: profile?.fullName || "",
                bio: profile?.bio || "",
                interests: profile?.interests?.map(item => item.interest) || [],
                location: profile?.location
                    ? mapProfileLocationToForm(profile.location)
                    : undefined,
            }}
        >
            <ImageUploaderProvider>
                {children}
            </ImageUploaderProvider>
        </EditProfileFormProvider>
    );
};
