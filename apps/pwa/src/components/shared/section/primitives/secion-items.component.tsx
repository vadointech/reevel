import { ComponentProps, ReactNode } from "react"

import styles from "../styles.module.scss"
import cx from "classnames"

export type Variant = "column" | "cols" | "flex" | "row"

export namespace SectionItems {
    export type Props = ComponentProps<"div"> & {
        children: ReactNode
        variant: Variant;
    }
}

export const SectionItems = ({
    children,
    variant,
    className,
}: SectionItems.Props) => {
    return (
        <div className={cx(
            styles.section__items,
            styles[`section__items_${variant}`],
            className,
        )}>
            {children}
        </div>
    )
}