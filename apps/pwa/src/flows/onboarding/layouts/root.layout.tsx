import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "@/i18n/routing";

import { getUserProfile } from "@/api/profile";
import { OnboardingStoreProvider } from "@/features/onboarding";
import { ImageUploaderProvider } from "@/features/uploader/image";

import { Locale } from "@/types/common";

import styles from "../styles/root-layout.module.scss";

export namespace OnboardingRootLayout {
    export type Props = PropsWithChildren<{
        locale: Locale;
    }>;
}

export async function OnboardingRootLayout({ locale, children }: OnboardingRootLayout.Props) {
    const { data } = await getUserProfile({
        nextHeaders: await headers(),
    });

    const onboardingStatus = data?.completed;

    if(onboardingStatus === "true") {
        return redirect({
            href: "/",
            locale,
        });
    }

    return (
        <OnboardingStoreProvider
            init={[{
                fullName: data?.fullName,
                bio: data?.bio,
                picture: data?.picture,
                interests: data?.interests?.map(item => item.interestId),
                locationCenter: data?.location?.center?.coordinates,
            }]}
        >
            <ImageUploaderProvider>
                <div className={styles.layout}>
                    { children }
                </div>
            </ImageUploaderProvider>
        </OnboardingStoreProvider>
    );
}
