"use client"
import { IconDark } from "@/components/icons";
import { Toggle } from "@/components/shared/toggle";
import { ComponentProps } from "react";
import cx from "classnames"
import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { useTheme } from "@/providers/theme.provider";

export namespace AppearanceSection {
    export type Props = ComponentProps<"div">
}

export const AppearanceSection = ({
    className
}: AppearanceSection.Props) => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === "dark";

    const handleThemeChange = () => {
        setTheme(isDarkMode ? "light" : "dark");
    };

    return (
        <Section title="Appearance" className={cx(className)}>
            <OptionsList>
                <OptionsListItem
                    label="Dark mode"
                    contentLeft={<IconDark width={22} height={22} />}
                    contentRight={<Toggle setToggled={handleThemeChange} toggled={isDarkMode} />}
                />
            </OptionsList>
        </Section>
    )
}