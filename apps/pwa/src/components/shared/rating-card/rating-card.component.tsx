import { ComponentProps } from "react";
import { Avatar, Stars } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace RatingCard {
    export type Data = {
        rating: number;
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const RatingCard = ({
    rating,
    className,
    ...props
}: RatingCard.Props) => {
    return (
        <div
            className={cx(
                styles.card,
                className,
            )}
            {...props}
        >
            <div className={styles.card__feedback}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                classical Latin literature from 45 BC, making it It has roots in a piece of classical Latin
                literature from 45 BC, making it ov
            </div>
            <div className={styles.card__details}>
                <Avatar image={"/assets/temp/avatar.png"} />
                <div>
                    <Stars size={"small"} count={rating} />
                    <div className={styles.card__author}>
                        Judit S. <span>• 2 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};