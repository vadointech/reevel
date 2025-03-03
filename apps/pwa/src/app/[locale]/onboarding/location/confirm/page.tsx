"use client";

import { useEffect } from "react";
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { OnboardingProgress, OnboardingTextBlock, useOnboardingProgress } from "../../_components";
import { OnboardingConfirmLocation } from "../_components";

import { MapView } from "@/components/persistent-map/map.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IMapboxProvider } from "@/components/persistent-map/providers";
import { usePersistentMap } from "@/components/persistent-map/map.context";
import styles from "./styles.module.scss";

export default function Page() {
    const { handleSetStep } = useOnboardingProgress();
    const queryClient = useQueryClient();
    const userLocation = queryClient.getQueryData<any>(["user/location"]);

    const { provider } = usePersistentMap();

    useEffect(() => {
        if(!userLocation) {
            handleSetStep("/onboarding/location");
        }
    }, [userLocation]);

    const { data } = useQuery({
        queryKey: ["user/city"],
        queryFn: () => {
            return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation?.lng},${userLocation?.lat}.json?access_token=${provider?.accessToken}&types=place,region`)
                .then(res => res.json())
                .then(data => data.features[0])
                .catch(err => err);
        },
    });

    const handleMapReady = (provider: IMapboxProvider) => {
        if(data) {
            if(data.place_type.includes("place")) {
                provider.fitBounds(data?.bbox, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
            if(data.place_type.includes("region")) {
                provider.flyTo(data?.center, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
        }

    };

    return (
        <>
            <MapView
                onMapReady={handleMapReady}
            />
            <Drawer staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <OnboardingProgress />
                        <OnboardingTextBlock
                            title={`Are You In ${data?.text}?`}
                            subtitle={"You’ve selected Palo Alto. You can always change it later in your profile settings."}
                            className={styles.page__textBlock}
                        />

                        <OnboardingConfirmLocation />
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </>
    );
};
