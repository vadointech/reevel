import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { Calendar, Input, OptionsListItem } from "@/components/shared/_redesign";
import { IconCalendar } from "@/components/icons";

export namespace CreateEventFormDatePicker {
    export type Props = never;
}

export const CreateEventFormDatePicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"Date"}
                    description={"Today"}
                    contentLeft={<IconCalendar />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent
                size={"large"} 
                confirmButton={false}
                title={"Select date"}
            >
                <Calendar />
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};
