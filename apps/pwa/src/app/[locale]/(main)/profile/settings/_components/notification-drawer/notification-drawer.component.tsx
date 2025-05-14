import { ComponentProps, useState } from "react"

import { OptionItem, Options } from "@/components/shared/options"
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/_redesign"
import { Container } from "@/components/ui"

import { Back, IconNotification } from "@/components/icons"
import { Toggle } from "@/components/shared/toggle"
import { Checkbox } from "@/components/shared/checkbox"

import styles from "./styles.module.scss"
import cx from "classnames"
import { useDrawerNotification } from "@/features/profile/settings/hooks"

export namespace NotificationDrawer {
    export type Props = ComponentProps<"div"> & {
    }
}

export const NotificationDrawer = ({ ...props }: NotificationDrawer.Props) => {

    const { settings, handleSettingChange } = useDrawerNotification()

    return (
        <Drawer staticPointKey="Medium">
            <DrawerTrigger className={styles.drawer__trigger} aria-label="Open notifications">
                <OptionItem label="Notifications" description="All" icon={<IconNotification width={22} height={22} />} >
                    <Back width={7} height={14} style={{ rotate: "180deg" }} />
                </OptionItem>
            </DrawerTrigger>
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <h2>Push notifications</h2>
                    <Container>
                        <OptionItem
                            label="Block all"
                            description="Disable all notifications from this app."
                            aria-label="Block all notifications"
                        >
                            <Toggle
                                setToggled={() => handleSettingChange('blocked', !settings.blocked)}
                                toggled={settings.blocked}
                            />
                        </OptionItem>

                        <Options
                            className={cx(
                                styles.drawer__options,
                                settings.blocked && styles.drawer__options_blured
                            )}
                            aria-label="Notification settings"
                        >
                            <OptionItem
                                label="Recommendations"
                                description="You've got 3 new events in your city"
                                aria-label="Enable recommendations notifications"
                            >
                                <Checkbox
                                    setSelected={() => handleSettingChange('recommendations', !settings.recommendations)}
                                    selected={settings.recommendations}
                                />
                            </OptionItem>
                            <OptionItem
                                label="Reevel"
                                description="Your subscription expires in 7 days"
                                aria-label="Enable subscription expiration notifications"
                            >
                                <Checkbox
                                    setSelected={() => handleSettingChange('expiredNotification', !settings.expiredNotification)}
                                    selected={settings.expiredNotification}
                                />
                            </OptionItem>
                        </Options>
                    </Container>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
}

