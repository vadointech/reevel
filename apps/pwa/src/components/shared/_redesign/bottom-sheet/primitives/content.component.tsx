import { ComponentProps } from "react";

import { useBottomSheetStore } from "../store";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetContent {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetContent = ({
    className,
    style,
    ...props
}: BottomSheetContent.Props) => {
    const { snapControls } = useBottomSheetStore();
    return (
        <div
            style={{
                paddingBottom: snapControls.Top,
                ...style,
            }}
            className={cx(styles.bottomSheet__content, className)}
            {...props}
        />
    );
};
