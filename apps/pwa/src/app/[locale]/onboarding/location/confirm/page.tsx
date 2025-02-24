import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { ProgressBar } from "@/components/shared";
import { OnboardingTextBlock } from "../../_components";
import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { MapProvider } from "@/components/map/context";
import { Map } from "@/components/map";

import styles from "./styles.module.scss";

export default function Page() {

    return (
        <>
            <MapProvider
                accessToken={process.env.MAPBOX_ACESS_TOKEN}
                mapStyle={process.env.MAPBOX_MAP_STYLE_DARK}
            >
                <Map />
            </MapProvider>
            <Drawer staticPoint={"middle"} modal={false}>
                <DrawerBody>
                    <DrawerContent>
                        <ProgressBar
                            stepCount={4}
                            currentStep={3}
                            type="back"
                        />

                        <OnboardingTextBlock
                            title={"Are You In Palo Alto?"}
                            subtitle={"You’ve selected Palo Alto. You can always change it later in your profile settings."}
                            className={styles.page__textBlock}
                        />
                        <Button variant="primary" iconAfter={<ArrowBack />} className={styles.page__button}>
                            Yes, browse events
                        </Button>
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </>
    );
}
