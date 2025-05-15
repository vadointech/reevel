"use client";

import { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
import { Button, FormField, Input, OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { CreateEventFormSchemaValues, useCreateEventForm } from "@/features/event/create";

import styles from "./styles.module.scss";

export namespace CreateEventForm {
    export type Props = ComponentProps<"form">;
}

export const CreateEventForm = ({ ...props }: CreateEventForm.Props) => {
    const { handleSubmit } = useFormContext<CreateEventFormSchemaValues>();
    const { onSubmit } = useCreateEventForm();
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <div className={styles.form__content}>
                <div className={styles.form__gap_sm}>
                    <Controller
                        name={"title"}
                        render={({ field, fieldState }) => (
                            <FormField gap={"small"} state={fieldState}>
                                <Input
                                    {...field}
                                    label={"Title"}
                                    placeholder={"Enter title"}
                                />
                            </FormField>
                        )}
                    />
                </div>
                <div className={styles.form__gap}>
                    <Controller
                        name={"description"}
                        render={({ field, fieldState }) => (
                            <FormField state={fieldState}>
                                <Input.TextArea
                                    {...field}
                                    label={"Description"}
                                    placeholder={"Enter description"}
                                />
                            </FormField>
                        )}
                    />
                </div>

                <div>
                    <CreateEventFormInterestsPicker />

                    <div className={styles.form__gap}>
                        <Controller
                            name={"location"}
                            render={({ field, fieldState }) => (
                                <FormField
                                    nestedError={"coordinates"}
                                    state={fieldState}
                                >
                                    <OptionsList>
                                        <OptionsListItem
                                            label={"Location"}
                                            description={field.value.title || "Required"}
                                            contentLeft={<IconNavigation />}
                                            href={"/event/create/location"}
                                        />
                                    </OptionsList>
                                </FormField>
                            )}
                        />
                    </div>

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
                    type={"submit"}
                    arrowAfter={<ArrowNext />}
                >
                    Next step
                </Button>
            </div>
        </form>
    );
};
