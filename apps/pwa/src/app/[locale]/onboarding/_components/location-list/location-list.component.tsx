import { ComponentProps } from "react";
import styles from "./styles.module.scss";

import { Place } from "../place/place.component";


export namespace LocationList {
    export type Props = ComponentProps<"div"> & {
        locations: { city: string, country: string }[];
    };
}

export const LocationList = ({ locations, ...props }: LocationList.Props) => {

    return (
        <div className={styles.container}>
            {locations.map((item, i) => (
                <Place city={item.city} country={item.country} key={i} />

            ))}
        </div>
    );
};
