"use client";

import { useNotificationDrawer } from "@/features/profile/settings/hooks";

import { Checkbox, OptionsList, OptionsListItem, Toggle } from "@/components/ui";
import { Back, IconNotification } from "@/components/icons";

import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetTrigger,
    ProfileSettingsBottomSheetContent,
} from "../../bottom-sheet";

import cx from "classnames";
import styles from "../styles/notification-picker.module.scss";

export namespace ProfileSettingsNotificationPicker {
    export type Props = never;
}

export const ProfileSettingsNotificationPicker = () => {
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
                <Content />
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    );
};

const Content = () => {
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
