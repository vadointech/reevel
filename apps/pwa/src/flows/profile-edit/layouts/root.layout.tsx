import { PropsWithChildren } from "react";

import { ImageUploaderProvider } from "@/features/uploader/image";
import { EditProfileFormProvider, mapProfileLocationToForm } from "@/features/profile/edit";
import { getCurrentUserInterests, getCurrentUserProfile } from "@/api/user/server";

export namespace EditProfileRootLayout {
    export type Props = PropsWithChildren;
}

export const EditProfileRootLayout = async({
    children,
}: EditProfileRootLayout.Props) => {
    const [profile, interests] = await Promise.all([
        getCurrentUserProfile(),
        getCurrentUserInterests(),
    ]);


    return (
        <EditProfileFormProvider
            pictureToSelect={profile?.picture || "/assets/defaults/avatar.png"}

            defaultValues={{
                background: "",
                avatar: profile?.picture || "",
                fullName: profile?.fullName || "",
                bio: profile?.bio || "",
                interests: interests || [],
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
