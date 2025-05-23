"use client"

import { ComponentProps } from "react"
import { OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconWorld } from "@/components/icons"
import { LanguageContent } from "./primitives/language-content.component"
import { ProfileSettingsBottomSheet, ProfileSettingsBottomSheetContent, ProfileSettingsBottomSheetTrigger } from "../../bottom-sheet"


export namespace LanguageDrawer {
    export type Props = never;
}

export const LanguageDrawer = () => {

    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsListItem
                    label="Application language"
                    description={"System"}
                    contentLeft={<IconWorld width={22} height={22} />}
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                />
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Push notifications"
                size="small"
            >
                <LanguageContent />
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    )
}

