import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Check, Navigation } from "@/components/icons";


export namespace Place {
    export type Props = ComponentProps<"div"> & {
        city: string,
        country: string,
        selected?: boolean
    };
}

export const Place = ({ country, city, selected, ...props }: Place.Props) => {

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__city}>
                    <Navigation />
                    <p>{city}</p>
                </div>
                <p className={styles.container__contry}>{country}</p>
            </div>
            {
                selected &&
                <div className={styles.container__check}>
                    <Check width={12} height={8} />
                </div>
            }
        </div>
    );
};
