"use client"

import { ComponentProps } from "react"

import styles from "../styles.module.scss"
import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Toggle } from "@/components/shared/toggle"
import { useDrawerNotification } from "@/features/profile/settings/hooks"
import { Checkbox } from "@/components/shared/checkbox"

import cx from "classnames"

export namespace NotificationContent {
    export type Props = ComponentProps<"div">
}

export const NotificationContent = ({ ...props }: NotificationContent.Props) => {
    const { settings, handleSettingChange } = useDrawerNotification()

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="Block all"
                    description="Disable all notifications from this app."
                    contentRight={
                        <Toggle
                            setToggled={() => handleSettingChange('blocked', !settings.blocked)}
                            toggled={settings.blocked}
                        />
                    }
                >
                </OptionsListItem>
            </OptionsList>
            <OptionsList className={cx(
                settings.blocked && styles.options_blured
            )}>
                <OptionsListItem
                    label="Recommendations"
                    description="You've got 3 new events in your city"
                    contentRight={
                        <Checkbox
                            setSelected={() => handleSettingChange('recommendations', !settings.recommendations)}
                            selected={settings.recommendations}
                        />
                    }
                >

                </OptionsListItem>
                <OptionsListItem
                    label="Reevel"
                    description="Your subscription expires in 7 days"
                    contentRight={
                        <Checkbox
                            setSelected={() => handleSettingChange('expiredNotification', !settings.expiredNotification)}
                            selected={settings.expiredNotification}
                        />
                    }
                >
                </OptionsListItem>
            </OptionsList>
        </>
    )
}