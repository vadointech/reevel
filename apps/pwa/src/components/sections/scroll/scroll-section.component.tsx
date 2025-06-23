import { ComponentProps } from "react";

import { Scroll } from "@/components/ui";
import { Section } from "../section.component";

import { UISize } from "@/types/common";

export namespace ScrollSection {
    export type Props = ComponentProps<"div"> & Section.Props & {
        size?: UISize;
        variant?: Section.Variant;
    };
}

export const ScrollSection = ({
    children,
    container = true,
    size,
    ...props
}: ScrollSection.Props) => {
    return (
        <Section {...props} container={container}>
            <Scroll size={size}>
                {children}
            </Scroll>
        </Section>
    );
};
