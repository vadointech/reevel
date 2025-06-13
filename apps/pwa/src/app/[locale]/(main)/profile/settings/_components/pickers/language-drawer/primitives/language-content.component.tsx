"use client";

import { useState } from "react";

import { OptionsList, OptionsListItem, Checkbox } from "@/components/ui";
import { IconEngland, IconSystemCounty, IconUkraine } from "@/components/icons";

import { Locale } from "@/types/common";

export namespace LanguageContent {
    export type Language = Locale | "system";

    export type Props = never;
}

export const LanguageContent = () => {

    const [selectedLanguage, setSelectedLanguage] = useState<LanguageContent.Language>("uk");

    const handleLanguageSelect = (language: LanguageContent.Language) => {
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