import { ComponentProps, useId } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { Navigation } from "@/components/icons";


export namespace Place {
    export type Props = ComponentProps<"div"> & {
        city: string,
        country: string
    };
}

export const Place = ({ country, city, ...props }: Place.Props) => {

    return (
        <div className={styles.container}>
            <div className={styles.container__city}>
                <Navigation />
                <p>{city}</p>
            </div>
            <p className={styles.container__contry}>{country}</p>
        </div>
    );
};
