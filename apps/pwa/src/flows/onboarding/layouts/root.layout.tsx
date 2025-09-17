import { PropsWithChildren } from "react";

import { getCurrentUserProfile } from "@/api/user/server";
import { OnboardingFormProvider } from "@/features/onboarding";
import { ImageUploaderProvider } from "@/features/uploader/image";


import styles from "../styles/root-layout.module.scss";

export namespace OnboardingRootLayout {
    export type Props = PropsWithChildren;
}

export async function OnboardingRootLayout({  children }: OnboardingRootLayout.Props) {
    const profile = await getCurrentUserProfile();

    return (
        <OnboardingFormProvider
            pictureToSelect={profile?.picture || "/assets/defaults/avatar.png"}
            defaultValues={{
                picture: profile?.picture || "",
                fullName: profile?.fullName || "",
                bio: profile?.bio || "",
                interests: profile?.interests?.map(item => item.interest) || [],
            }}
        >
            <ImageUploaderProvider>
                <div className={styles.layout}>
                    { children }
                </div>
            </ImageUploaderProvider>
        </OnboardingFormProvider>
    );
}
