import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import cx from "classnames";
import { useBottomSheet } from "@/components/shared/_redesign/bottom-sheet/bottom-sheet.context";

export namespace BottomSheetTrigger {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetTrigger = ({ className, ...props }: BottomSheetTrigger.Props) => {
    const { controller } = useBottomSheet();

    return (
        <div
            className={cx(
                styles.bottomSheet__triger,
                className,
            )}
            onClick={() => controller.current.open()}
            {...props}
        />
    );
};
