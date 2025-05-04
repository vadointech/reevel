import { ComponentProps } from "react";
import { Avatar, Stars } from "@/components/shared/_redesign";
import { Typography } from "@/components/ui";

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
            <Typography.p size={"sm"} className={styles.card__feedback}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                classical Latin literature from 45 BC, making it It has roots in a piece of classical Latin
                literature from 45 BC, making it ov
            </Typography.p>
            <div className={styles.card__details}>
                <Avatar image={"/assets/temp/avatar.png"} />
                <div>
                    <Stars size={"small"} count={rating} />
                    <Typography.div size={"xs"} className={styles.card__author}>
                        Judit S. <Typography.span size={"xs"}>• 2 days ago</Typography.span>
                    </Typography.div>
                </div>
            </div>
        </div>
    );
};