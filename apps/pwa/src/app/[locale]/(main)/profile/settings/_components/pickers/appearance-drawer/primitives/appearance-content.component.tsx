"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

import { OptionsList, OptionsListItem, Checkbox } from "@/components/ui";

import { UIMode } from "@/types/common";

export namespace AppearanceContent {
    export type Props = never;
}

export const AppearanceContent = () => {
    const { theme, setTheme } = useTheme();
    const [selectedMode, setSelectedMode] = useState(theme ?? "system");

    const handleModeSelect = (mode: UIMode) => {
        setSelectedMode(mode);
        setTheme(mode);
    };

    return (
        <>
            <OptionsList>
                <OptionsListItem
                    label="System"
                    contentRight={<Checkbox
                        onChange={() => handleModeSelect("system")}
                        checked={selectedMode === "system"}
                    />}
                    iconType="outlined"
                />

                <OptionsListItem
                    label="Dark"
                    contentRight={
                        <Checkbox
                            onChange={() => handleModeSelect("dark")}
                            checked={selectedMode === "dark"}
                        />
                    }
                    iconType="outlined"

                />

                <OptionsListItem
                    label="Light"
                    contentRight={
                        <Checkbox
                            onChange={() => handleModeSelect("light")}
                            checked={selectedMode === "light"}
                        />
                    }
                    iconType="outlined"
                />
            </OptionsList>
        </>
    );
};