import { Controller, UseControllerReturn } from "react-hook-form";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { Calendar, OptionsListItem } from "@/components/shared/_redesign";
import { IconCalendar } from "@/components/icons";
import { useCreateEventFormFieldFormatter } from "@/features/event/create";

export namespace CreateEventFormDatePicker {
    export type Props = never;
}

export const CreateEventFormDatePicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <Controller
                name={"startDate"}
                render={(field) => (
                    <Field {...field} />
                )}
            />
        </CreateEventFormBottomSheet>
    );
};

const Field = ({ field }: UseControllerReturn) => {
    const formatter = useCreateEventFormFieldFormatter();
    return (
        <>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"Date"}
                    description={formatter.formatDate(field.value)}
                    contentLeft={<IconCalendar />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent
                size={"large"}
                title={"Select date"}
                resetButton={false}
            >
                <Calendar
                    {...field}
                />
            </CreateEventFormBottomSheetContent>
        </>
    );
};
