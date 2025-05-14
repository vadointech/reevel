import { ComponentProps } from "react";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";
import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { VisibilityCard } from "./visibility-card";

import styles from "./styles.module.scss";


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
                        title={"How to set up your _event ?"}
                        subtitle={"Select the type of _event youd like to create"}
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
