"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import {
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
import { InterestEntity } from "@/entities/interests";

import styles from "./styles.module.scss";

export namespace CreatePrivateEventForm {
    export type Data = {
        interests: InterestEntity[]
    };
    export type Props = ComponentProps<"form"> & Data;
}

export const CreatePrivateEventForm = ({
    interests,
    ...props
}: CreatePrivateEventForm.Props) => {
    const { handleSubmit } = useCreateEventForm({
        nextStepUrl: "/event/private/create/preview",
    });

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
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
                    <Section
                        title={"Interests"}
                        cta={"See all"}
                        ctaHref={"/event/private/create/interests"}
                    >
                        <CreateEventFormInterestsPicker interests={interests} />
                    </Section>

                    <div className={styles.form__gap}>
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
                                            href={"/event/private/create/location"}
                                        />
                                    </OptionsList>
                                </FormField>
                            )}
                        />
                    </div>

                    <Section title={"Date"}>
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
