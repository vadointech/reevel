import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/persistent-map/map.provider";
import { OnboardingStoreProvider } from "@/features/onboarding/stores/onboarding.store";
import { getUserProfile } from "@/api/profile/get-one";

import { getSession } from "@/api/auth/get-session";
import { redirect } from "@/i18n/routing";
import { OnboardingStepPath } from "@/features/onboarding";
import { ParamsWithLocale } from "@/types/common";

import styles from "./styles.module.scss";

export default async function OnboardingLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    const { data } = await getUserProfile();


    const { data: session } = await getSession();

    const onboardingStatus = session?.profile.completed;

    if(onboardingStatus === "false") {
        return redirect({
            href: "/onboarding/photo",
            locale,
        });
    }

    if(onboardingStatus === "true") {
        return redirect({
            href: "/",
            locale,
        });
    }

    const onboardingStep = Number(onboardingStatus);
    if(!isNaN(onboardingStep)) {
        return redirect({
            href: OnboardingStepPath[onboardingStep],
            locale,
        });
    }

    return (
        <PersistentMapProvider
            mapAccessToken={process.env.MAPBOX_ACESS_TOKEN}
            mapStyleDark={process.env.MAPBOX_MAP_STYLE_DARK}
            mapStyleLight={process.env.MAPBOX_MAP_STYLE_LIGHT}
            initialViewState={{
                latitude: 49.23188823685999,
                longitude: 28.468377628194958,
                zoom: 12,
                pitch: 45,
            }}
        >
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
        </PersistentMapProvider>
    );
}