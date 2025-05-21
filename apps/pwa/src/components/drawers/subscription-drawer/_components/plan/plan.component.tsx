import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { ComponentProps } from "react";
import { SubscriptionCard } from "../subscription-card";

import styles from "./styles.module.scss"
import { SubscriptionData } from "../../subscription-drawer.component";

export namespace Plan {
    export type Props = ComponentProps<"div"> & {
        data: SubscriptionData
    }
}

export const Plan = ({
    data,
}: Plan.Props) => {
    return (
        <>
            <SubscriptionCard
                title={data.title}
                type={data.type}
                description={data.description}
                price={data.price}
            />

            <Section title="Features for you" className={styles.section}>
                <OptionsList>
                    {data.features.map((item, i) => (
                        <OptionsListItem
                            key={i}
                            label={item.label}
                            description={item.description}
                            contentLeft={item.icon}
                        />
                    ))}
                </OptionsList>
            </Section >

        </>
    )
}