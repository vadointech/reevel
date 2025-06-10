import styles from "../styles.module.scss";
import { ReactNode } from "react";


export namespace OptionsListItemContent {
    export type Props = {
        label: string | ReactNode;
        status: string | ReactNode;
        relativeTime?: string;
        description?: string | ReactNode;
        contentBottom?: string | ReactNode;
    };
}
export const OptionsListItemContent = ({
    label,
    status,
    relativeTime,
    description,
    contentBottom,
}: OptionsListItemContent.Props) => {
    return (
        <div className={styles.listItem__content}>
            <div className={styles.listItem__title}>{label}
                {
                    status && (
                        <span className={styles.listItem__status}>
                            {status}
                        </span>
                    )
                }
            </div>

            {
                description && (
                    <div className={styles.listItem__description}>
                        {description} {relativeTime && relativeTime}
                    </div>
                )
            }

            {
                contentBottom && (
                    <div className={styles.listItem__bottom}>
                        {contentBottom}
                    </div>
                )
            }
        </div>
    );
};