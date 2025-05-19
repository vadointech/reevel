import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetContent {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetContent = ({
    className,
    ...props
}: BottomSheetContent.Props) => {
    return (
        <div
            className={cx(styles.bottomSheet__content, className)}
            {...props}
        />
    );
};
