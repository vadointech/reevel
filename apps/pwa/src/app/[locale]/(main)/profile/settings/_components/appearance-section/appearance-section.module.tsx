import { IconDark } from "@/components/icons";
import { OptionItem } from "@/components/shared/options";
import { Section } from "@/components/shared/section";
import { Toggle } from "@/components/shared/toggle";
import { ComponentProps, useState } from "react";

import cx from "classnames"

export namespace AppearanceSection {
    export type Props = ComponentProps<"div">
}

export const AppearanceSection = ({
    className
}: AppearanceSection.Props) => {

    const [darkMode, setDarkMode] = useState(false)

    return (
        <Section title="Appearance" className={cx(className)}>
            <OptionItem label="Dark mode" icon={<IconDark width={22} height={22} />} >
                <Toggle setToggled={() => setDarkMode(!darkMode)} toggled={darkMode} />
            </OptionItem>
        </Section>
    )
}