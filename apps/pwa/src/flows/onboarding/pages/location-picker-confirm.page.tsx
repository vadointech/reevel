"use client";

import { useLocationConfirmation } from "@/features/onboarding";
import { MapView } from "@/components/shared/map";
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingProgressBar } from "../modules/progress";
import { OnboardingConfirmLocation } from "../modules/location-picker";

import styles from "../styles/location-picker-confirm.module.scss";

export namespace OnboardingLocationPickerConfirmationPage {
    export type Props = never;
}

export function OnboardingLocationPickerConfirmationPage() {
    const {
        place,
        handleShowOnMap,
    } = useLocationConfirmation();

    return (
        <>
            <MapView onMapReady={handleShowOnMap} />
            <Drawer open={!!place} staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <OnboardingProgressBar step={3} />
                        <OnboardingTextBlock
                            title={`Are You In ${place?.place_name}?`}
                            subtitle={`You’ve selected ${place?.place_name}. You can always change it later in your profile settings.`}
                            className={styles.page__textBlock}
                        />
                        <OnboardingConfirmLocation />
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </>
    );
}
