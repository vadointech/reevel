import { PropsWithChildren } from "react";

import { getCurrentUserProfile } from "@/api/user/server";
import { ImageUploaderProvider } from "@/features/uploader/image";
import { EditProfileFormProvider } from "@/features/profile/update";
import { ProfileLocationMapper } from "@/features/profile/mappers";

import styles from "../styles/root-layout.module.scss";

export namespace OnboardingRootLayout {
    export type Props = PropsWithChildren;
}

export async function OnboardingRootLayout({ children }: OnboardingRootLayout.Props) {
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
                    ? ProfileLocationMapper.toPlaceLocationEntity(profile.location)
                    : undefined,
            }}
        >
            <ImageUploaderProvider>
                <div className={styles.layout}>
                    {children}
                </div>
            </ImageUploaderProvider>
        </EditProfileFormProvider>
    );
}
