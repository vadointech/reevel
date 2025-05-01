"use client"
import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { useEventStore } from "@/features/event";
import { OptionItem, Options } from "@/components/shared/options";


export namespace ReportDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const ReportDrawer = ({ open, onClose }: ReportDrawer.Props) => {
    return (
        <Drawer open={open} defaultPoint={"full"}>
            <DrawerBody>
                <DrawerContent>
                    <OnboardingTextBlock
                        title={`What would you like to report?`}
                    />

                    <Options>
                        <OptionItem icon={"📝"} label="Incorrect Event Details" description="Wrong date, location, or description." onClick={onClose} backIcon />
                        <OptionItem icon={"🚫"} label="Fraudulent Activity / Scams" description="Suspicious payment requests or fake event." onClick={onClose} backIcon />
                        <OptionItem icon={"️⚠️"} label="Inappropriate Content" description="Offensive, explicit, or discriminatory material." href="/" backIcon />
                        <OptionItem icon={"📧"} label="Spam or Irrelevant Listings" description="Repeated, unrelated, or irrelevant events." href="/" backIcon />
                        <OptionItem icon={"❓️"} label="Other" description="Please describe the issue." href="/" backIcon />
                    </Options>

                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
};
