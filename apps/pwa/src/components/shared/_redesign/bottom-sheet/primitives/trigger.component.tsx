import { ComponentProps } from "react";

import { useBottomSheetStore } from "../store";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetTrigger {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetTrigger = ({ className, ...props }: BottomSheetTrigger.Props) => {
    const bottomSheetStore = useBottomSheetStore();

    return (
        <div
            className={cx(
                styles.bottomSheet__triger,
                className,
            )}
            onClick={() => bottomSheetStore.setOpen()}
            {...props}
        />
    );
};
