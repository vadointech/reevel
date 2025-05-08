import { ScrollSection } from "../scroll";
import { RatingCard } from "@/components/shared/rating-card";
import { Section, Stars } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";

export namespace ReviewsSection {
    export type Data = Section.Props & {
        rating: number;
        count: number;
    };
    export type Props = Data;
}

export const ReviewsSection = ({
    rating,
    count,
    ...props
}: ReviewsSection.Props) => {
    return (
        <ScrollSection
            {...props}
        >
            <div className={styles.reviews}>
                <Stars count={rating} />
                <div className={styles.reviews__content}>
                    <div className={styles.reviews__rating}>
                        { rating }
                    </div>
                    <div className={styles.reviews__count}>
                        ({ count })
                    </div>
                </div>
            </div>
            <RatingCard rating={rating} />
            <RatingCard rating={rating} />
        </ScrollSection>
    );
};
