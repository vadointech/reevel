"use client"

import { ComponentProps } from "react"
import { OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconNotification } from "@/components/icons"

import { NotificationContent } from "./primitives/notification-content.component"
import { ProfileSettingsBottomSheet, ProfileSettingsBottomSheetTrigger, ProfileSettingsBottomSheetContent } from "../../bottom-sheet"

export namespace NotificationDrawer {
    export type Props = never;
}

export const NotificationDrawer = () => {
    return (

        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsListItem
                    label="Notifications"
                    description="All"
                    contentLeft={<IconNotification width={22} height={22} />}
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                />
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Push notifications"
                size="xsmall"
            >
                <NotificationContent />

            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    )
}
