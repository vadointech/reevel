import { Controller, UseControllerReturn } from "react-hook-form";

import { useCreateEventFormFieldFormatter } from "@/features/event/create";

import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetBody,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "./bottom-sheet.component";

import { Input, OptionsListItem } from "@/components/ui";
import { IconDollar } from "@/components/icons";

export namespace CreateEventFormPricePicker {
    export type Props = never;
}

export const CreateEventFormPricePicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <Controller
                name={"ticketPrice"}
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
                    label={"Price per ticket"}
                    description={formatter.formatPrice(field.value)}
                    contentLeft={<IconDollar />}
                    iconType={"outlined"}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetBody>
                <CreateEventFormBottomSheetContent
                    title={"How much does it cost?"}
                    onReset={() => {
                        field.onChange(null);
                    }}
                >
                    <Input.Number
                        {...field}
                        label={"per ticket"}
                        placeholder={"0 ₴"}
                    />
                </CreateEventFormBottomSheetContent>
            </CreateEventFormBottomSheetBody>
        </>
    );
};