"use client";

import { useNotificationDrawer } from "@/features/profile/settings/hooks";

import { OptionsList, OptionsListItem, Checkbox, Toggle } from "@/components/ui";

import styles from "../styles.module.scss";

import cx from "classnames";

export namespace NotificationContent {
    export type Props = never;
}

export const NotificationContent = () => {
    const { settings, handleSettingChange } = useNotificationDrawer();

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="Block all"
                    description="Disable all notifications from this app."
                    contentRight={
                        <Toggle
                            setToggled={() => handleSettingChange("blocked", !settings.blocked)}
                            toggled={settings.blocked}
                        />
                    }
                >
                </OptionsListItem>
            </OptionsList>
            <OptionsList className={cx(
                settings.blocked && styles.options_blured,
            )}>
                <OptionsListItem
                    label="Recommendations"
                    description="You've got 3 new events in your city"
                    contentRight={
                        <Checkbox
                            onChange={() => handleSettingChange("recommendations", !settings.recommendations)}
                            checked={settings.recommendations}
                        />
                    }
                >

                </OptionsListItem>
                <OptionsListItem
                    label="Reevel"
                    description="Your subscription expires in 7 days"
                    contentRight={
                        <Checkbox
                            onChange={() => handleSettingChange("expiredNotification", !settings.expiredNotification)}
                            checked={settings.expiredNotification}
                        />
                    }
                >
                </OptionsListItem>
            </OptionsList>
        </>
    );
};