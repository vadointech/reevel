import { ComponentProps, PointerEvent } from "react";

import { useBottomSheetStore } from "../store";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace BottomSheetHandle {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetHandle = ({
    className,
    onPointerDown,
    ...props
}: BottomSheetHandle.Props) => {
    const bottomSheetStore = useBottomSheetStore();
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (bottomSheetStore.rootConfig.handleOnly) {
            bottomSheetStore.dragControls.start(event);
        }
        onPointerDown?.(event);
    };
    return (
        <div
            className={cx(
                styles.bottomSheet__handle,
                className,
            )}
            onPointerDown={handlePointerDown}
            {...props}
        />
    );
};
