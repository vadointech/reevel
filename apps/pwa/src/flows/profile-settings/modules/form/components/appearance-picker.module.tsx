"use client";

import { useTheme } from "@/features/theme/hooks";

import { Checkbox, OptionsList, OptionsListItem } from "@/components/ui";
import { IconDark } from "@/components/icons";
import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetContent,
    ProfileSettingsBottomSheetTrigger,
} from "../../bottom-sheet";

import { Theme } from "@/features/theme";

export namespace ProfileSettingsAppearancePicker {
    export type Props = never;
}

export const ProfileSettingsAppearancePicker = () => {
    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsList>
                    <OptionsListItem
                        label="Dark mode"
                        contentLeft={<IconDark />}
                    />
                </OptionsList>
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title="Appearance"
                size="small"
            >
                <Content />
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    );
};

const Content = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="System"
                    onClick={() => setTheme(Theme.SYSTEM)}
                    contentRight={
                        <Checkbox
                            checked={theme === Theme.SYSTEM}
                        />
                    }
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Dark"
                    onClick={() => setTheme(Theme.DARK)}
                    contentRight={
                        <Checkbox
                            checked={theme === Theme.DARK}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="Light"
                    onClick={() => setTheme(Theme.LIGHT)}
                    contentRight={
                        <Checkbox
                            checked={theme === Theme.LIGHT}
                        />
                    }
                    iconType="outlined"
                />
            </OptionsList>
        </>
    );
};

