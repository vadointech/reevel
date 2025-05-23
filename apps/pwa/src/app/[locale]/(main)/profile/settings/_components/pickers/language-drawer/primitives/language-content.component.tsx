"use client"

import { ComponentProps, useState } from "react"
import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Checkbox } from "@/components/shared/checkbox"
import { IconEngland, IconSystemCounty, IconUkraine } from "@/components/icons"
import { Locale } from "@/types/common"

export namespace LanguageContent {
    export type Language = Locale | 'system';

    export type Props = ComponentProps<"div">
}

export const LanguageContent = ({ ...props }: LanguageContent.Props) => {

    const [selectedLanguage, setSelectedLanguage] = useState<LanguageContent.Language>('uk');

    const handleLanguageSelect = (language: LanguageContent.Language) => {
        setSelectedLanguage(language);
    };

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="English"
                    contentLeft={<IconEngland width={22} height={22} />}
                    contentRight={<Checkbox
                        setSelected={() => handleLanguageSelect('en')}
                        selected={selectedLanguage === 'en'}
                    />}
                    iconType="outlined"
                    disabled={true}
                />

                <OptionsListItem
                    label="Ukrainian"
                    contentLeft={<IconUkraine width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            setSelected={() => handleLanguageSelect('uk')}
                            selected={selectedLanguage === 'uk'}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="System"
                    contentLeft={<IconSystemCounty width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            setSelected={() => handleLanguageSelect('system')}
                            selected={selectedLanguage === 'system'}
                        />
                    }
                    iconType="outlined"
                    disabled={true}
                />
            </OptionsList>
        </>
    )
}