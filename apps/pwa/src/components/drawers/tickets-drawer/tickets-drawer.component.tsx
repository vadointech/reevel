"use client"
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { useEventStore } from "@/features/event";

import { Button, Input } from "@/components/ui";

import styles from "./styles.module.scss"
import { Check } from "@/components/icons";
import { observer } from "mobx-react-lite";


export namespace TicketsDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const TicketsDrawer = observer(({ open, onClose }: TicketsDrawer.Props) => {
    const eventStore = useEventStore()

    return (
        <Drawer open={open} defaultPoint={"middle"} >
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <OnboardingTextBlock
                        className={styles.drawer__text}
                        title={`How Many Tickets?`}
                    />
                    <Input
                        pattern="[0-9]*"
                        type="input"
                        inputMode="numeric"
                        placeholder={eventStore.tickets.toString()}
                        variant="numeric" label="Tickets"
                        className={styles.input}
                        onChange={(e) => eventStore.setTickets(+e.target.value)}
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
