import { ComponentProps, ReactNode } from "react";

import { IconSearch } from "@/components/icons";

import styles from "./styles.module.scss";
import baseStyles from "../../base-styles.module.scss";
import cx from "classnames";

export namespace InputSearch {
    export type Props = ComponentProps<"input"> & {
        iconBefore?: ReactNode
    };
}

export const InputSearch = ({
    iconBefore = <IconSearch />,
    ...props
}: InputSearch.Props) => {
    return (
        <label
            className={cx(
                baseStyles.input,
                styles.search,
            )}
        >
            { iconBefore}
            <input type={"text"} {...props} />
        </label>
    );
};
