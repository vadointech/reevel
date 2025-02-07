import { type ComponentProps } from "react";
import cx from "classnames"
import styles from "./styles.module.scss"

export namespace Hint {
  export type Props = ComponentProps<"div">
}

const Hint = ({ className, children, ...props }: Hint.Props) => {
  return (
    <div className={cx(
      styles.hint,
      className,
      { ...props }
    )}
    >
      {children}
    </div>
  )
}

export { Hint }