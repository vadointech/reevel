import { ComponentProps } from "react"
import { OptionsListItem } from "@/components/shared/_redesign"
import { Back, IconNotification } from "@/components/icons"

import { CreateSettingsBottomSheet, CreateSettingsBottomSheetContent, CreateSettingsBottomSheetTrigger } from "../../bottom-sheet"
import { NotificationContent } from "./notification-content.component"

export namespace NotificationDrawer {
    export type Props = ComponentProps<"div">
}

export const NotificationDrawer = ({ children, ...props }: NotificationDrawer.Props) => {
    return (

        <CreateSettingsBottomSheet>
            <CreateSettingsBottomSheetTrigger>
                <OptionsListItem
                    label="Notifications"
                    description="All"
                    contentLeft={<IconNotification width={22} height={22} />}
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                />
            </CreateSettingsBottomSheetTrigger>

            <CreateSettingsBottomSheetContent
                title="Push notifications"
                size="xsmall"
            >
                <NotificationContent />

            </CreateSettingsBottomSheetContent>
        </CreateSettingsBottomSheet>
    )
}
