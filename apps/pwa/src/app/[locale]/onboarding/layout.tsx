import { PropsWithChildren } from "react";
import { PersistentMapProvider } from "@/components/persistent-map/map.provider";
import { OnboardingStoreProvider } from "@/features/onboarding/stores/onboarding.store";

import styles from "./styles.module.scss";
import { getUserProfile } from "@/api/profile/get-one";

export default async function OnboardingLayout({ children }: PropsWithChildren) {

    const { data } = await getUserProfile();

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
                init={[data ? data : {}]}
            >
                <div className={styles.layout}>
                    { children }
                </div>
            </OnboardingStoreProvider>
        </PersistentMapProvider>
    );
}