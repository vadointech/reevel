"use client";

import { ComponentProps } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
} from "@/components/shared/_redesign/bottom-sheet";
import { useLocationPickerStore } from "@/features/location/picker";

export namespace LocationPickerConfirmationDrawer {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerConfirmationDrawer = ({ ...props }: LocationPickerConfirmationDrawer.Props) => {

    const { location } = useLocationPickerStore();

    return (
        <BottomSheetBody>
            <BottomSheetContent>
                <div style={{ height: 300 }}>
                    confirm { location[0] } { location[1] }
                </div>
            </BottomSheetContent>
        </BottomSheetBody>
    );
};
