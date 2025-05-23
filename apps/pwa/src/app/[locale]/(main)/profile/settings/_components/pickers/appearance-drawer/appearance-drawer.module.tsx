"use client"

import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconDark, IconWorld } from "@/components/icons"
import { ProfileSettingsBottomSheet, ProfileSettingsBottomSheetContent, ProfileSettingsBottomSheetTrigger } from "../../bottom-sheet"
import { AppearanceContent } from "./primitives/appearance-content.component";


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
    )
}

