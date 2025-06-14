"use client";

import { useState } from "react";

import { Checkbox, OptionsList, OptionsListItem } from "@/components/ui";
import { Back, IconEngland, IconGlobe, IconSystemCounty, IconUkraine } from "@/components/icons";
import {
    ProfileSettingsBottomSheet,
    ProfileSettingsBottomSheetContent,
    ProfileSettingsBottomSheetTrigger,
} from "../../bottom-sheet";
import { Locale } from "@/types/common";

export namespace ProfileSettingsLanguagePicker {
    export type Language = Locale | "system";
    export type Props = never;
}

export const ProfileSettingsLanguagePicker = () => {

    return (
        <ProfileSettingsBottomSheet>
            <ProfileSettingsBottomSheetTrigger>
                <OptionsListItem
                    label="Language"
                    description={"System"}
                    contentLeft={<IconGlobe width={22} height={22} />}
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                />
            </ProfileSettingsBottomSheetTrigger>

            <ProfileSettingsBottomSheetContent
                title={"Application language"}
                size="small"
            >
                <Content />
            </ProfileSettingsBottomSheetContent>
        </ProfileSettingsBottomSheet>
    );
};

const Content = () => {

    const [selectedLanguage, setSelectedLanguage] = useState<ProfileSettingsLanguagePicker.Language>("uk");

    const handleLanguageSelect = (language: ProfileSettingsLanguagePicker.Language) => {
        setSelectedLanguage(language);
    };

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="English"
                    contentLeft={<IconEngland width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            onChange={() => handleLanguageSelect("en")}
                            checked={selectedLanguage === "en"}
                        />
                    }
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Ukrainian"
                    contentLeft={<IconUkraine width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            onChange={() => handleLanguageSelect("uk")}
                            checked={selectedLanguage === "uk"}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="System"
                    contentLeft={<IconSystemCounty width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            onChange={() => handleLanguageSelect("system")}
                            checked={selectedLanguage === "system"}
                        />
                    }
                    iconType="outlined"
                />
            </OptionsList>
        </>
    );
};

