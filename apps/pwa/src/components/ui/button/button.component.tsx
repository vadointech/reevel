// Title.tsx
import { type ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
  export type Props = ComponentProps<"div"> & {
    variant: 'default' | 'primary' | 'text'
  }
}

const Button = ({
  variant = 'default',
  className,
  children,
  ...props
}: Button.Props) => {
  return (
    <div
      className={cx(
        styles.button,
        styles.button__box,
        styles[`button__box_${variant}`],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Button }
