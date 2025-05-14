import { Controller, UseControllerReturn } from "react-hook-form";
import { Input, OptionsListItem } from "@/components/shared/_redesign";
import { IconDollar } from "@/components/icons";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetContent,
    CreateEventFormBottomSheetTrigger,
} from "../bottom-sheet";
import { useCreateEventFormFieldFormatter } from "@/features/event/create";

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
        </>
    );
};