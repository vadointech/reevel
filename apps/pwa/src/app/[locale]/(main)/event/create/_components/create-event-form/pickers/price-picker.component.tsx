import { Input, OptionsListItem } from "@/components/shared/_redesign";
import { IconDollar } from "@/components/icons";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";

export namespace CreateEventFormPricePicker {
    export type Props = never;
}

export const CreateEventFormPricePicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"Price per ticket"}
                    description={"Free"}
                    contentLeft={<IconDollar />}
                    iconType={"outlined"}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent title={"How much does it cost?"}>
                <Input.Number
                    label={"per ticket"}
                    placeholder={"0 ₴"}
                />
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};