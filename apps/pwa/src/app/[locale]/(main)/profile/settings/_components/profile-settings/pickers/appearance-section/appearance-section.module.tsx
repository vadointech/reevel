"use client"
import { IconDark } from "@/components/icons";
import { Toggle } from "@/components/shared/toggle";
import { ComponentProps, useState } from "react";

import cx from "classnames"
import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

export namespace AppearanceSection {
    export type Props = ComponentProps<"div">
}

export const AppearanceSection = ({
    className
}: AppearanceSection.Props) => {

    const [darkMode, setDarkMode] = useState(false)

    return (
        <Section title="Appearance" className={cx(className)}>
            <OptionsList>
                <OptionsListItem
                    label="Dark mode"
                    contentLeft={<IconDark width={22} height={22} />}
                    contentRight={<Toggle setToggled={() => setDarkMode(!darkMode)} toggled={darkMode} />}
                />
            </OptionsList>
        </Section>
    )
}