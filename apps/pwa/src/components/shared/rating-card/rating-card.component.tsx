import { ComponentProps } from "react";
import cx from "classnames"
import styles from "./styles.module.scss"
import { Avatar } from "@/components/ui";
import { IconStar } from "@/components/icons";
import { Stars } from "../stars";

export namespace RatingCard {
    export type Props = ComponentProps<"div"> & {

    }
}

export const RatingCard = ({

    className,
    ...props
}: RatingCard.Props) => {
    return (
        <div className={cx(styles.card, className)}>
            <div className={styles.card__feedback}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it ov...</div>
            <div className={styles.card__details}>
                <Avatar size={34} />
                <div className={styles.card__details__wrapper}>
                    <div className={styles.card__details__wrapper__stars}>
                        <Stars count={5} defaultRating="3" icon="★" iconSize={20} readonly />
                    </div>
                    <div className={styles.card__details__wrapper__author}>
                        Judit S.
                        <span>• 2 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};