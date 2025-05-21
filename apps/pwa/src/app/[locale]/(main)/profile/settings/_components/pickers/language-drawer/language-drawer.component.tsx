"use client"

import { ComponentProps } from "react"
import { OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconWorld } from "@/components/icons"
import { CreateSettingsBottomSheet, CreateSettingsBottomSheetContent, CreateSettingsBottomSheetTrigger } from "../../bottom-sheet"
import { LanguageContent } from "./primitives/language-content.component"


export namespace LanguageDrawer {
    export type Props = never;
}

export const LanguageDrawer = () => {

    return (
        <CreateSettingsBottomSheet>
            <CreateSettingsBottomSheetTrigger>
                <OptionsListItem
                    label="Language"
                    description={"System"}
                    contentLeft={<IconWorld width={22} height={22} />}
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                />
            </CreateSettingsBottomSheetTrigger>

            <CreateSettingsBottomSheetContent
                title="Push notifications"
                size="small"
            >
                <LanguageContent />
            </CreateSettingsBottomSheetContent>
        </CreateSettingsBottomSheet>
    )
}

