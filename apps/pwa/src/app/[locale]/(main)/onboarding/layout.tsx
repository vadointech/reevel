import { PropsWithChildren } from "react";
import { OnboardingStoreProvider } from "@/features/onboarding/stores/onboarding.store";
import { ParamsWithLocale } from "@/types/common";
import { getUserProfile } from "@/api/profile/get-one";
import { redirect } from "@/i18n/routing";
import { headers } from "next/headers";

import styles from "./styles.module.scss";

export const dynamic = "force-dynamic";

export default async function OnboardingLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

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
                location: data?.location?.coordinates,
            }]}
        >
            <div className={styles.layout}>
                { children }
            </div>
        </OnboardingStoreProvider>
    );
}