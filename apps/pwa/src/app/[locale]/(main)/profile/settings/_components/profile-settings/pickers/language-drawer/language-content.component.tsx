"use client"

import { ComponentProps, useState } from "react"

import styles from "./styles.module.scss"
import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Toggle } from "@/components/shared/toggle"
import { useDrawerNotification } from "@/features/profile/settings/hooks"
import { Checkbox } from "@/components/shared/checkbox"

import cx from "classnames"
import { IconEngland, IconSystemCounty, IconUkraine } from "@/components/icons"

export namespace LanguageContent {
    export type Language = 'english' | 'ukrainian' | 'system';

    export type Props = ComponentProps<"div">
}

export const LanguageContent = ({ ...props }: LanguageContent.Props) => {

    const [selectedLanguage, setSelectedLanguage] = useState<LanguageContent.Language>('system');

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
                        setSelected={() => handleLanguageSelect('english')}
                        selected={selectedLanguage === 'english'}
                    />}
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Ukrainian"
                    contentLeft={<IconUkraine width={22} height={22} />}
                    contentRight={
                        <Checkbox
                            setSelected={() => handleLanguageSelect('ukrainian')}
                            selected={selectedLanguage === 'ukrainian'}
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

                />
            </OptionsList>
        </>
    )
}