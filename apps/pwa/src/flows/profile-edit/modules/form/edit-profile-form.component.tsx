"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import { useCreateEventForm } from "@/features/event/create";


import { IconArrowNext, IconLocation } from "@/components/icons";
import { Button, FormField, Input, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";

import { InterestEntity } from "@/entities/interests";

import styles from "./styles/edit-profile-form.module.scss";
import { EditProfileFormSchemaValues } from "@/features/profile/edit";
import { UserProfileEntity } from "@/entities/profile";

import { EditProfileAvatarUploader } from "../avatar-picker";
import { EditProfileBackGroundUploader } from "../background-upload";
import { useEditProfileFormContext } from "@/features/profile/edit/edit-profile-form.context";


import { GetUserUploads } from "@/api/user/uploads";
import { EditProfileFormInterestsPicker } from "./components";

export namespace EditProfileForm {
    export type Data = {
        interests: InterestEntity[]
        user: UserProfileEntity | null
        uploads: GetUserUploads.TOutput;
    };
    export type Props = ComponentProps<"form"> & Data;
}

export const EditProfileForm = ({
    user,
    interests,
    uploads,
    ...props
}: EditProfileForm.Props) => {
    const { handleSubmit } = useCreateEventForm({
        nextStepUrl: "/event/private/create/preview",
    });

    const { store } = useEditProfileFormContext();

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className={styles.form__content}>
                <div className={styles.form__hero}>
                    <div className={styles.form__hero__background}>
                        <EditProfileBackGroundUploader uploads={uploads} cropperPageUrl="edit/upload" background={store.pictureToSelect} />
                    </div>

                    <div
                        className={styles.form__hero__avatar}
                    >
                        <EditProfileAvatarUploader uploads={uploads} cropperPageUrl="edit/upload" avatar={store.pictureToSelect} />
                    </div>

                </div>

                <Section className={styles.form__gap} title="Personal information">
                    <div className={styles.form__gap_sm}>
                        <Controller
                            name={"fullName"}
                            render={({ field, fieldState }) => (
                                <FormField gap={"small"} state={fieldState}>
                                    <Input

                                        {...field}
                                        label={"Full Name"}
                                        placeholder={user?.fullName}
                                    />
                                </FormField>
                            )}
                        />
                    </div>
                    <Controller
                        name={"bio"}
                        render={({ field, fieldState }) => (
                            <FormField state={fieldState}>
                                <Input.TextArea
                                    {...field}
                                    label={"Profile Bio"}
                                    placeholder={user?.bio}
                                />
                            </FormField>
                        )}
                    />
                </Section>

                <Section
                    title={"Interests"}
                    cta={"See all"}
                    ctaHref={"/profile/edit/interests"}
                >
                    <EditProfileFormInterestsPicker interests={interests} />
                </Section>

                <Section className={styles.form__gap}>
                    <Controller<EditProfileFormSchemaValues, "location">
                        name={"location"}
                        render={({ fieldState }) => (
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
