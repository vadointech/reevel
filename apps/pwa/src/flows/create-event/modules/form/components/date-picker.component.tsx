import { Controller } from "react-hook-form";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetBody,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "./bottom-sheet.component";
import { Calendar, OptionsListItem } from "@/components/shared/_redesign";
import { IconCalendar } from "@/components/icons";
import { useCreateEventFormDatePicker } from "@/features/event/create";

export namespace CreateEventFormDatePicker {
    export type Props = never;
}

export const CreateEventFormDatePicker = () => {
    const {
        handleChange,
        getDescription,
    } = useCreateEventFormDatePicker();
    return (
        <CreateEventFormBottomSheet>
            <Controller
                name={"endDate"}
                render={({ field: endDateField }) => {
                    return (
                        <Controller
                            name={"startDate"}
                            render={({ field }) => (
                                <>
                                    <CreateEventFormBottomSheetTrigger>
                                        <OptionsListItem
                                            label={"Date"}
                                            description={getDescription(field.value, endDateField.value)}
                                            contentLeft={<IconCalendar />}
                                        />
                                    </CreateEventFormBottomSheetTrigger>
                                    <CreateEventFormBottomSheetBody>
                                        <CreateEventFormBottomSheetContent
                                            size={"large"}
                                            title={"Select date"}
                                            resetButton={false}
                                        >
                                            <Calendar
                                                value={field.value}
                                                onChange={handleChange}
                                            />
                                        </CreateEventFormBottomSheetContent>
                                    </CreateEventFormBottomSheetBody>
                                </>
                            )}
                        />
                    );
                }}
            />
        </CreateEventFormBottomSheet>
    );
};