import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";

export namespace CollectionCard {
    export type Props = ComponentProps<"input"> & {

    };
}



export const CollectionCard = ({ className, ...props }: CollectionCard.Props) => {
    return (
        <div
            className={cx(styles.card, className)}
            {...props}
        >
            <div>test</div>

            <div className={styles.card__background}>
                Voleyball
            </div>
        </div>
    );
};
