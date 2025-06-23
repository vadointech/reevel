import { Controller } from "react-hook-form";

import { useCreateEventFormDatePicker } from "@/features/event/create";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetBody,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "./bottom-sheet.component";

import { OptionsListItem } from "@/components/ui";
import { IconCalendar } from "@/components/icons";
import { Calendar } from "@/components/shared/calendar";

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