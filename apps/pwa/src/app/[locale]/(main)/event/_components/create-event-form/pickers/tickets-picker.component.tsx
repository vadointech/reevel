import { Controller, UseControllerReturn } from "react-hook-form";
import { Input, OptionsListItem } from "@/components/shared/_redesign";
import { IconTicketTilted } from "@/components/icons";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetTrigger,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetBody,
} from "../bottom-sheet";
import { useCreateEventFormFieldFormatter } from "@/features/event/create";

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
