
import { Check } from "@/components/icons"
import styles from "./styles.module.scss"
import cx from "classnames"
import { ComponentProps } from "react"

export namespace Checkbox {
    export type Props = ComponentProps<"div"> & {
        selected?: boolean
        setSelected?: () => void;
    }
}

export const Checkbox = ({
    selected,
    setSelected,
    className,
    ...props
}: Checkbox.Props) => {
    return (
        <div
            onClick={setSelected}
            className={cx(
                styles.checkbox,
                selected && styles.checkbox_selected,
                className,
                { ...props }
            )}>
            {selected &&
                <Check width={11} height={8} className={cx(
                    styles.checkbox__icon
                )} />
            }
        </div>
    )
}