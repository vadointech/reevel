import { ComponentProps } from "react";
import { Section } from "@/components/shared/_redesign";
import { Scroll } from "@/components/ui";
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
