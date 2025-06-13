import { Controller, UseControllerReturn } from "react-hook-form";

import { useCreateEventFormFieldFormatter } from "@/features/event/create";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetTrigger,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetBody,
} from "./bottom-sheet.component";

import { Input, OptionsListItem } from "@/components/ui";
import { IconTicketTilted } from "@/components/icons";


export namespace CreateEventFormTicketsPicker {
    export type Props = never;
}

export const CreateEventFormTicketsPicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <Controller
                name={"ticketsAvailable"}
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
                    label={"Tickets"}
                    description={formatter.formatTickets(field.value)}
                    contentLeft={<IconTicketTilted />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetBody>
                <CreateEventFormBottomSheetContent
                    title={"How Many Tickets?"}
                    onReset={() => {
                        field.onChange(null);
                    }}
                >
                    <Input.Number
                        {...field}
                        label={"tickets"}
                        placeholder={"0"}
                    />
                </CreateEventFormBottomSheetContent>
            </CreateEventFormBottomSheetBody>
        </>
    );
};
