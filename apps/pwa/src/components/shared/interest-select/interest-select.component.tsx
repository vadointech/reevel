
import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";
import { IconCheck } from "@/components/icons";

export namespace InterestSelect {
    export type Props = ComponentProps<"div"> & {
        title: string,
        icon: string,
        selected?: boolean,
        onClick?: () => void;
    };
}


export const InterestSelect = ({
    title,
    icon,
    selected,
    onClick,
    className,
}: InterestSelect.Props) => {


    return (
        <div className={cx(
            styles.select,
            className,
        )}
        onClick={onClick}
        >
            <div className={styles.select__icon}>{icon}</div>
            <div className={styles.select__title}>{title}</div>
            {
                <div className={cx(
                    styles.select__checkbox,
                    selected && styles.select__checkbox_selected,
                )}>
                    <IconCheck />
                </div>
            }
        </div>
    );
};