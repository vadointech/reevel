import { ComponentProps } from "react";
import { Carousel } from "@/components/shared/carousel";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace SectionSkeleton {
    export type Props = Omit<ComponentProps<"div">, "title"> & {
        title?: boolean;
        description?: boolean;
        cta?: boolean;
        container?: boolean;
    };
}

export const SectionSkeleton = ({
    children,
    title,
    description,
    container = true,
    ...props
}: SectionSkeleton.Props) => {
    return (
        <div {...props}>
            {
                (title || description) && (
                    <div className={styles.section__head}>
                        {
                            title && (
                                <h2 className={styles.skeleton__title} />
                            )
                        }
                        {
                            description && (
                                <div className={styles.skeleton__description} />
                            )
                        }
                    </div>
                )
            }
            {
                children ? (
                    <div
                        className={cx(
                            styles.section__content,
                            container && styles.section__content_container,
                        )}
                    >
                        { children }
                    </div>
                ) : null
            }
        </div>
    );
};

export const ScrollSectionSkeleton  = ({
    children,
    ...props
}: SectionSkeleton.Props) => {
    return (
        <SectionSkeleton {...props} container={false}>
            <Carousel>
                { children }
            </Carousel>
        </SectionSkeleton>
    );
};