import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { redirect } from "@/i18n/routing";

import { getSession } from "@/api/user/server";
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
    const { data } = await getSession({
        nextHeaders: await headers(),
    });

    const profile = data?.profile;

    const onboardingStatus = profile?.completed;

    if(onboardingStatus === "true") {
        return redirect({
            href: "/",
            locale,
        });
    }

    return (
        <OnboardingFormProvider
            pictureToSelect={profile?.picture || "TODO: Add default picture"}
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
