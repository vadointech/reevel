"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import {
    CreateEventFormPricePicker,
    CreateEventFormTicketsPicker,
    CreateEventFormDatePicker,
    CreateEventFormTimePicker,
    CreateEventFormInterestsPicker,
} from "./pickers";

import {
    ArrowNext,
    IconNavigation,
} from "@/components/icons";
import { Button, Input, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";

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
                    <Controller
                        name={"title"}
                        render={({ field }) => (
                            <Input
                                {...field}
                                label={"Title"}
                                placeholder={"Enter title"}
                            />
                        )}
                    />
                </div>
                <div className={styles.form__gap}>
                    <Controller
                        name={"description"}
                        render={({ field }) => (
                            <Input.TextArea
                                {...field}
                                label={"Description"}
                                placeholder={"Enter description"}
                            />
                        )}
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
                    arrowAfter={<ArrowNext />}
                    href={"/event/create/preview"}
                >
                    Next step
                </Button>
            </div>
        </form>
    );
};
