import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";
import { IconWorld } from "@/components/icons";



export namespace VisibilityCard {
    export type Props = ComponentProps<"div"> & {
        type: "Private" | "Public"
    };
}

export const VisibilityCard = ({ type, className, ...props }: VisibilityCard.Props) => {
    const description = type === "Public" ? 'Your event will be shown for everyone' : "Your event will be shown for your friends"

    return (
        <div className={cx(className, styles.card)} {...props}>
            <IconWorld width={16} height={16} />
            <div className={styles.info}>
                <h3>{type} event</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};
