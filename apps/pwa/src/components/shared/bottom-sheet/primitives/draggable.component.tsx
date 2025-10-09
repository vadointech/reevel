"use client";

import { ComponentProps, PointerEvent } from "react";
import { useBottomSheet } from "@/components/shared/bottom-sheet";

export namespace BottomSheetDraggable {
    export type Props = ComponentProps<"div">;
}

export const BottomSheetDraggable = ({ ...props }: BottomSheetDraggable.Props) => {
    const { controller } = useBottomSheet();
    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        controller.dragControls.start(event);
        event.stopPropagation();
    };
    return (
        <div
            onPointerDown={handlePointerDown}
            {...props}
        />
    );
};
