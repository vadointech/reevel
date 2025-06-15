"use client";

import { useState } from "react";

import { Checkbox, OptionsList, OptionsListItem } from "@/components/ui";
import { IconDark } from "@/components/icons";
import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetContent,
    ProfileSettingsBottomSheetTrigger,
} from "../../bottom-sheet";

import { UIMode } from "@/types/common";

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
                        contentLeft={<IconDark width={22} height={22} />}
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
    const [selectedMode, setSelectedMode] = useState("system");

    const handleModeSelect = (mode: UIMode) => {
        setSelectedMode(mode);
    // setTheme(mode);
    };

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="System"
                    onClick={() => handleModeSelect("system")}
                    contentRight={
                        <Checkbox
                            checked={selectedMode === "system"}
                        />
                    }
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Dark"
                    onClick={() => handleModeSelect("dark")}
                    contentRight={
                        <Checkbox
                            checked={selectedMode === "dark"}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="Light"
                    onClick={() => handleModeSelect("light")}
                    contentRight={
                        <Checkbox
                            checked={selectedMode === "light"}
                        />
                    }
                    iconType="outlined"
                />
            </OptionsList>
        </>
    );
};

