import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { OnboardingProgress, OnboardingTextBlock } from "../../_components";
import { OnboardingConfirmLocation } from "../_components";
import { MapStoreProvider } from "@/components/map/api/stores/map-store.provider";
import { Map } from "@/components/map";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <>
            <MapStoreProvider init={[{
                accessToken: process.env.MAPBOX_ACESS_TOKEN,
                mapStyleDark: process.env.MAPBOX_MAP_STYLE_DARK,
                mapStyleLight: process.env.MAPBOX_MAP_STYLE_LIGHT,
            }]}>
                <Map />
            </MapStoreProvider>
            <Drawer staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <OnboardingProgress />
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
