// Title.tsx
import { type ComponentProps } from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

export namespace Button {
  export type Props = ComponentProps<"button"> & {
    variant: 'default' | 'primary' | 'text';
    size?: 'small';
  }
}

const Button = ({
  variant = 'default',
  size,
  className,
  children,
  ref,
  disabled,
  ...props
}: Button.Props) => {
  return (
    <button
      className={cx(
        styles.button,
        styles.button__box,
        styles[`button__box_${variant}`],
        styles[`button__box_${size}`],
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button }
