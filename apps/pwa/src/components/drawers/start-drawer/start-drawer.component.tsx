import { ComponentProps } from "react";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";

import styles from "./styles.module.scss";
import { VisibilityCard } from "./visibility-card";


export namespace StartDrawer {
    export type Props = ComponentProps<"div"> & {

    };
}

export const StartDrawer = ({ }: StartDrawer.Props) => {
    return (
        <Drawer open={true}>
            <DrawerBody>
                <DrawerContent>
                    <OnboardingTextBlock
                        title={`How to set up your event ?`}
                        subtitle={'Select the type of event youd like to create'}
                    />

                    <div className={styles.cards}>
                        <VisibilityCard type="Public" />
                        <VisibilityCard type="Private" />
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
