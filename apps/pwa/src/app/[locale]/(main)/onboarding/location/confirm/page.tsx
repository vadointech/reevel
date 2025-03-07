"use client";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { OnboardingConfirmLocation } from "../_components";
import { OnboardingProgress, OnboardingTextBlock } from "../../_components";
import { MapView } from "@/components/map/map.component";
import { observer } from "mobx-react-lite";
import { useLocationConfirmation } from "@/features/onboarding";

import styles from "./styles.module.scss";

export default observer(function Page() {
    const {
        place,
        handleShowOnMap,
    } = useLocationConfirmation();

    return (
        <>
            <MapView
                onMapReady={handleShowOnMap}
            />
            <Drawer open={!!place} staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <OnboardingProgress step={3} />
                        <OnboardingTextBlock
                            title={`Are You In ${place?.place_name}?`}
                            subtitle={"You’ve selected Palo Alto. You can always change it later in your profile settings."}
                            className={styles.page__textBlock}
                        />
                        <OnboardingConfirmLocation />
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </>
    );
});
