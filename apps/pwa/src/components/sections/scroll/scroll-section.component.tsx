import { ComponentProps } from "react";
import { Section } from "@/components/shared/_redesign";
import { Scroll } from "@/components/ui";
import { UISize } from "@/types/common";

export namespace ScrollSection {
    export type Props = ComponentProps<"div"> & Section.Data & {
        size?: UISize
    };
}

export const ScrollSection = ({
    children,
    size,
    ...props
}: ScrollSection.Props) => {
    return (
        <Section {...props} container>
            <Scroll size={size}>
                { children }
            </Scroll>
        </Section>
    );
};
