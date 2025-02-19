import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { ProgressBar } from "@/components/shared";
import { OnboardingTextBlock } from "../_components";

import styles from './styles.module.scss'
import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/icons";

export default function Page() {

    return (
        <div>
            <Drawer defaultPoint={"middle"}>
                <DrawerTrigger>
                    Drawer here
                </DrawerTrigger>
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
        </div>
    );
}
