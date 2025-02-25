import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { OnboardingProgress, OnboardingTextBlock } from "../../_components";
import { OnboardingConfirmLocation } from "../_components";
import { MapProvider } from "@/components/map/context";
import { Map } from "@/components/map";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <MapProvider
                accessToken={process.env.MAPBOX_ACESS_TOKEN}
                mapStyle={{
                    light: process.env.MAPBOX_MAP_STYLE_LIGHT,
                    dark: process.env.MAPBOX_MAP_STYLE_DARK,
                }}
            >
                <Map />
            </MapProvider>
            <Drawer staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <OnboardingProgress position={"drawer"} />
                        <OnboardingTextBlock
                            title={"Are You In Palo Alto?"}
                            subtitle={"You’ve selected Palo Alto. You can always change it later in your profile settings."}
                            className={styles.page__textBlock}
                        />

                        <OnboardingConfirmLocation />
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </>
    );
}
