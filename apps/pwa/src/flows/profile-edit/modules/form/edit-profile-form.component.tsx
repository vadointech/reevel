"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import { useCreateEventForm } from "@/features/event/create";


import { IconArrowNext, IconLocation } from "@/components/icons";
import { Avatar, Button, FormField, Input, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";

import { InterestEntity } from "@/entities/interests";

import styles from "./styles/edit-profile-form.module.scss";
import { EditProfileFormSchemaValues } from "@/features/profile/edit";
import { ProfileHeroCover } from "@/flows/profile/modules/hero/primitives";
import { UserProfileEntity } from "@/entities/profile";
import { CreateEventFormInterestsPicker } from "@/flows/create-event/modules/form/components";

export namespace EditProfileForm {
    export type Data = {
        interests: InterestEntity[]
        user: UserProfileEntity | null
    };
    export type Props = ComponentProps<"form"> & Data;
}

export const EditProfileForm = ({
    user,
    interests,
    ...props
}: EditProfileForm.Props) => {
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
                <div className={styles.form__hero}>
                    <div className={styles.form__hero__background}>
                        <ProfileHeroCover image={"/assets/temp/amazon_bg.jpg"} onChangeBackground />
                    </div>

                    <div
                        className={styles.form__hero__avatar}
                    >
                        <Avatar image={user?.picture} />
                    </div>

                </div>

                <Section className={styles.form__gap} title="Personal information">
                    <div className={styles.form__gap_sm}>
                        <Controller
                            name={"title"}
                            render={({ field, fieldState }) => (
                                <FormField gap={"small"} state={fieldState}>
                                    <Input

                                        {...field}
                                        label={"Title"}
                                        placeholder={user?.fullName}
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
                                    placeholder={user?.bio}
                                />
                            </FormField>
                        )}
                    />
                </Section>

                <Section
                    title={"Interests"}
                    cta={"See all"}
                    ctaHref={"/event/private/create/interests"}
                >
                    <CreateEventFormInterestsPicker interests={interests} />
                </Section>

                <Section className={styles.form__gap}>
                    <Controller<EditProfileFormSchemaValues, "location">
                        name={"location"}
                        render={({ field, fieldState }) => (
                            <FormField
                                state={fieldState}
                            >
                                <OptionsList>
                                    <OptionsListItem
                                        label={"Location"}
                                        description={user?.location?.placeName}
                                        contentLeft={<IconLocation />}
                                        href={"/event/private/create/location"}
                                    />
                                    <OptionsListItem
                                        label={"Location"}
                                        description={user?.location?.placeName}
                                        contentLeft={<IconLocation />}
                                        href={"/event/private/create/location"}
                                    />
                                </OptionsList>
                            </FormField>
                        )}
                    />
                </Section>
            </div>

            <div className={styles.form__submit}>
                <Button
                    type={"submit"}
                    arrowAfter={<IconArrowNext />}
                >
                    Next step
                </Button>
            </div>
        </form>
    );
};
