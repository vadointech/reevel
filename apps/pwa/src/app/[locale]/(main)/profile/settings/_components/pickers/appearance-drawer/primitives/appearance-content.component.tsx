"use client"

import { ComponentProps, useState } from "react"
import { OptionsList, OptionsListItem } from "@/components/shared/_redesign"
import { Checkbox } from "@/components/shared/checkbox"
import { IconEngland, IconSystemCounty, IconUkraine } from "@/components/icons"
import { Locale, UIMode } from "@/types/common"
import { useTheme } from "next-themes"

export namespace AppearanceContent {

    export type Props = ComponentProps<"div">
}

export const AppearanceContent = ({ ...props }: AppearanceContent.Props) => {
    const { theme, setTheme } = useTheme()
    const [selectedMode, setSelectedMode] = useState(theme ?? "system");

    const handleModeSelect = (mode: UIMode) => {
        setSelectedMode(mode);
        setTheme(mode)
    };

    console.log(theme)
    console.log(selectedMode)


    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="System"
                    contentRight={<Checkbox
                        setSelected={() => handleModeSelect("system")}
                        selected={selectedMode === "system"}
                    />}
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Dark"
                    contentRight={
                        <Checkbox
                            setSelected={() => handleModeSelect("dark")}
                            selected={selectedMode === "dark"}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="Light"
                    contentRight={
                        <Checkbox
                            setSelected={() => handleModeSelect("light")}
                            selected={selectedMode === "light"}
                        />
                    }
                    iconType="outlined"
                />
            </OptionsList>
        </>
    )
}