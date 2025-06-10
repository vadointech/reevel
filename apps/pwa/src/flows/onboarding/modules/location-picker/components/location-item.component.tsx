import { IconLocation, IconCheck } from "@/components/icons";
import { ComponentProps } from "react";
import styles from "../styles/location-item.module.scss";
import cx from "classnames";

export namespace OnboardingLocationItem {
    export type Data = {
        city: string,
        country: string,
    };
    export type Props = ComponentProps<"div"> & {
        data: Data;
        selected?: boolean
    };
}

export const OnboardingLocationItem = ({ data, selected, className, ...props }: OnboardingLocationItem.Props) => {
    return (
        <div
            className={cx(
                styles.container,
                className,
            )}
            {...props}
        >
            <div>
                <div className={styles.container__city}>
                    <IconLocation />
                    <p>{ data.city }</p>
                </div>
                <p className={styles.container__contry}>{ data.country }</p>
            </div>
            {
                selected && (
                    <div className={styles.container__check}>
                        <IconCheck width={12} height={8} />
                    </div>
                )
            }
        </div>
    );
};
