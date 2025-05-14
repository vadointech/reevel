import { Section } from "@/components/shared/_redesign";
import { OptionItem, Options } from "@/components/shared/options";
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
                <Options>
                    {data.features.map((item) => (
                        <OptionItem
                            label={item.label}
                            description={item.description}
                            icon={item.icon}
                        />
                    ))}
                </Options>
            </Section >
        </>
    )
}