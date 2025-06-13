"use client";

import { OptionsList, OptionsListItem } from "@/components/ui";
import { Back, IconDark } from "@/components/icons";
import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetContent,
    ProfileSettingsBottomSheetTrigger,
} from "../../bottom-sheet";
import { AppearanceContent } from "./primitives";

export namespace AppearanceDrawer {
    export type Props = never;
}

export const AppearanceDrawer = () => {

    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsList>
                    <OptionsListItem
                        label="Dark mode"
                        contentLeft={<IconDark width={22} height={22} />}
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Push notifications"
                size="small"
            >

                <AppearanceContent />
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    );
};

