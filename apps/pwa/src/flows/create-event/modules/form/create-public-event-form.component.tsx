"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import { CreateEventFormSchemaValues, useCreateEventForm } from "@/features/event/create";

import {
    CreateEventFormPricePicker,
    CreateEventFormTicketsPicker,
    CreateEventFormDatePicker,
    CreateEventFormTimePicker,
    CreateEventFormInterestsPicker,
} from "./components";

import { ArrowNext, IconNavigation } from "@/components/icons";
import { Button, FormField, Input, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";

import { InterestEntity } from "@/entities/interests";

import styles from "./styles/create-event-form.module.scss";

export namespace CreatePublicEventForm {
    export type Data = {
        interests: InterestEntity[]
    };
    export type Props = ComponentProps<"form"> & Data;
}

export const CreatePublicEventForm = ({
    interests,
    ...props
}: CreatePublicEventForm.Props) => {
    const { handleSubmit } = useCreateEventForm({
        nextStepUrl: "/event/public/create/preview",
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.form__content}>
                <Section className={styles.form__gap}>
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
                </Section>

                <Section
                    title={"Interests"}
                    cta={"See all"}
                    ctaHref={"/event/public/create/interests"}
                >
                    <CreateEventFormInterestsPicker interests={interests} />
                </Section>

                <Section className={styles.form__gap}>
                    <Controller<CreateEventFormSchemaValues, "location">
                        name={"location"}
                        render={({ field, fieldState }) => (
                            <FormField
                                state={fieldState}
                            >
                                <OptionsList>
                                    <OptionsListItem
                                        label={"Location"}
                                        description={(() => {
                                            if(!field.value) return "Required";
                                            return `${field.value.properties.label} • ${field.value.properties.address}`;
                                        })()}
                                        contentLeft={<IconNavigation />}
                                        href={"/event/public/create/location"}
                                    />
                                </OptionsList>
                            </FormField>
                        )}
                    />
                </Section>

                <Section
                    title={"Pricing"}
                    className={styles.form__gap}
                >
                    <OptionsList>
                        <CreateEventFormTicketsPicker />
                        <CreateEventFormPricePicker />
                    </OptionsList>
                </Section>

                <Section title={"Date"}>
                    <OptionsList>
                        <CreateEventFormDatePicker />
                        <CreateEventFormTimePicker />
                    </OptionsList>
                </Section>
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
