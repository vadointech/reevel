import { ReactNode } from "react";
import styles from "./styles.module.scss"

import cx from "classnames"
export namespace PostersSection {
    export type Props = {
        children: ReactNode
    };
}

export const PostersSection = ({
    children,
    ...props
}: PostersSection.Props) => {

    return (
        <div className={cx(styles.section)} {...props}>
            {children}
        </div>
    )
};

