import { ComponentProps } from "react";

import { Input, TextArea } from "@/components/ui";

import { CreateEventFormInterestsPicker } from "./interests-picker";
import {
    CreateEventFormPricePicker,
    CreateEventFormTicketsPicker,
    CreateEventFormDatePicker,
    CreateEventFormTimePicker,
} from "./pickers";

import {
    ArrowNext,
    IconNavigation,
} from "@/components/icons";
import { Button, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";

export namespace CreateEventForm {
    export type Props = ComponentProps<"form">;
}

export const CreateEventForm = ({ ...props }: CreateEventForm.Props) => {
    return (
        <form
            className={styles.form}
            {...props}
        >
            <div className={styles.form__content}>
                <div className={styles.form__gap_sm}>
                    <Input
                        label={"Title"}
                        placeholder={"Enter title"}
                        variant={"default"}
                    />
                </div>
                <div className={styles.form__gap}>
                    <TextArea
                        label={"Description"}
                        placeholder={"Enter description"}
                        variant={"default"}
                    />
                </div>

                <div>
                    <CreateEventFormInterestsPicker />

                    <OptionsList className={styles.form__gap}>
                        <OptionsListItem
                            label={"Location"}
                            description={"Required"}
                            contentLeft={<IconNavigation />}
                        />
                    </OptionsList>

                    <Section
                        title={"Pricing"}
                        className={styles.form__gap}
                    >
                        <OptionsList>
                            <CreateEventFormTicketsPicker />
                            <CreateEventFormPricePicker />
                        </OptionsList>
                    </Section>

                    <Section
                        title={"Date"}
                    >
                        <OptionsList>
                            <CreateEventFormDatePicker />
                            <CreateEventFormTimePicker />
                        </OptionsList>
                    </Section>
                </div>
            </div>

            <div className={styles.form__submit}>
                <Button
                    variant={"primary"}
                    iconAfter={<ArrowNext />}
                >
                    Next step
                </Button>
            </div>
        </form>
    );
};
