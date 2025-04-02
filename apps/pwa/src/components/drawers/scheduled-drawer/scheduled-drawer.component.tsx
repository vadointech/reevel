"use client"
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { useEventStore } from "@/features/event";
import { IconGoogle } from "@/components/icons";
import { OptionItem, Options } from "@/components/shared/options";


export namespace ScheduledDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const ScheduledDrawer = ({ open, onClose }: ScheduledDrawer.Props) => {
    const eventStore = useEventStore()

    return (
        <Drawer open={open} defaultPoint={"middle"}>
            <DrawerBody>
                <DrawerContent>
                    <OnboardingTextBlock
                        title={`Are you sure?`}
                        subtitle={`You already have an event scheduled for ${eventStore.dateStore.startMonth} ${eventStore.dateStore.startDate} at ${eventStore.dateStore.startHour}:${eventStore.dateStore.startMinute}`}
                    />

                    <Options>
                        <OptionItem label="Change time" onClick={onClose} backIcon />
                        <OptionItem label="Skip step" onClick={onClose} backIcon />
                        <OptionItem label="Save as draft and leave" href="/" backIcon warn />
                    </Options>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
};
