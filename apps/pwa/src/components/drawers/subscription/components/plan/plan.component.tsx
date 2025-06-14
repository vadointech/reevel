import { ComponentProps } from "react";

import { Container, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";
import { SubscriptionData } from "@/components/drawers/subscription";
import { SubscriptionCard } from "../subscription-card";

import styles from "./styles.module.scss";

export namespace Plan {
    export type Props = ComponentProps<"div"> & {
        data: SubscriptionData
    };
}

export const Plan = ({
    data,
}: Plan.Props) => {
    return (
        <>
            <Container>
                <SubscriptionCard
                    title={data.title}
                    type={data.type}
                    description={data.description}
                    price={data.price}
                />
            </Container>

            <Section title="Features for you" className={styles.section}>
                <OptionsList>
                    {
                        data.features.map((item, i) => (
                            <OptionsListItem
                                key={i}
                                weight={"bold"}
                                label={item.label}
                                description={item.description}
                                contentLeft={item.icon}
                            />
                        ))
                    }
                </OptionsList>
            </Section >

        </>
    );
};