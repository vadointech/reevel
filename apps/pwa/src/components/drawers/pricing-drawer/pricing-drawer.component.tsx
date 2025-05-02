"use client"
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { useEventStore } from "@/features/event";

import { Button, Input } from "@/components/ui";

import styles from "./styles.module.scss"
import { Check } from "@/components/icons";
import { observer } from "mobx-react-lite";


export namespace PricingDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const PricingDrawer = observer(({ open, onClose }: PricingDrawer.Props) => {
    const eventStore = useEventStore()

    return (
        <Drawer open={open} defaultPoint={"middle"}>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <OnboardingTextBlock
                        title={`How much does it cost?`}
                        className={styles.drawer__text}
                    />
                    <Input
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder={`${eventStore.price.toString()} ₴`}
                        variant="numeric"
                        label="per ticket"
                        className={styles.input}
                        onChange={(e) => eventStore.setPrice(+e.target.value)}
                    />
                    <div className={styles.buttons}>
                        <Button
                            variant="primary"
                            onClick={onClose}
                        >
                            Confirm
                        </Button>
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
});
