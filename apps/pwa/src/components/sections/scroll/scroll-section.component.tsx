import { Section } from "../section.component";
import { Carousel } from "@/components/shared/carousel";
import { UISize } from "@/types/common";

export namespace ScrollSection {
    export type Props = Section.Props & {
        size?: UISize;
    };
}

export const ScrollSection = ({
    children,
    ...props
}: ScrollSection.Props) => {
    return (
        <Section {...props} container={false}>
            <Carousel>
                { children }
            </Carousel>
        </Section>
    );
};
