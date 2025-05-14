import { Input, OptionsListItem } from "@/components/shared/_redesign";
import { IconTicketTilted } from "@/components/icons";
import {
    CreateEventFormBottomSheet,
    CreateEventFormBottomSheetTrigger,
    CreateEventFormBottomSheetContent,
} from "../bottom-sheet";

export namespace CreateEventFormTicketsPicker {
    export type Props = never;
}

export const CreateEventFormTicketsPicker = () => {
    return (
        <CreateEventFormBottomSheet>
            <CreateEventFormBottomSheetTrigger>
                <OptionsListItem
                    label={"Tickets"}
                    description={"Unlimited"}
                    contentLeft={<IconTicketTilted />}
                />
            </CreateEventFormBottomSheetTrigger>
            <CreateEventFormBottomSheetContent title={"How Many Tickets?"}>
                <Input.Number
                    label={"tickets"}
                    placeholder={"0"}
                />
            </CreateEventFormBottomSheetContent>
        </CreateEventFormBottomSheet>
    );
};
