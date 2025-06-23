import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "@/i18n/routing";

import { getCurrentUserProfile } from "@/api/user/server";
import { OnboardingFormProvider } from "@/features/onboarding";
import { ImageUploaderProvider } from "@/features/uploader/image";

import { Locale } from "@/types/common";

import styles from "../styles/root-layout.module.scss";

export namespace OnboardingRootLayout {
    export type Props = PropsWithChildren<{
        locale: Locale;
    }>;
}

export async function OnboardingRootLayout({ locale, children }: OnboardingRootLayout.Props) {
    const { data } = await getCurrentUserProfile({
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
        <OnboardingFormProvider
            picture={data?.picture || ""}
            fullName={data?.fullName || ""}
            bio={data?.bio || ""}
            interests={data?.interests?.map(item => item.interest) || []}
        >
            <ImageUploaderProvider>
                <div className={styles.layout}>
                    { children }
                </div>
            </ImageUploaderProvider>
        </OnboardingFormProvider>
    );
}
