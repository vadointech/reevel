import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/persistent-map/map.provider";
import { OnboardingStoreProvider } from "@/features/onboarding/stores/onboarding.store";
import { ParamsWithLocale } from "@/types/common";
import { getUserProfile } from "@/api/profile/get-one";
import { redirect } from "@/i18n/routing";

import styles from "./styles.module.scss";

export const dynamic = "force-dynamic";

export default async function OnboardingLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    const { data } = await getUserProfile();

    const onboardingStatus = data?.completed;

    if(onboardingStatus === "true") {
        return redirect({
            href: "/",
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