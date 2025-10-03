"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import { IconLocation } from "@/components/icons";
import { FormField, Input, OptionsList, OptionsListItem } from "@/components/ui";
import { Section } from "@/components/sections";
import { EditProfileFormInterestsPicker } from "./components";

import { EditProfileFormSchemaValues } from "@/features/profile/edit";
import { useEditProfileFormContext } from "@/features/profile/edit/edit-profile-form.context";

import { EditProfileAvatarUploader } from "../avatar-picker";
import { EditProfileBackGroundUploader } from "../background-upload";

import { useRouter } from "@/i18n/routing";

import { GetUserUploads } from "@/api/user/uploads";

import styles from "./styles/edit-profile-form.module.scss";


export namespace EditProfileForm {
    export type Data = {
        uploads: GetUserUploads.TOutput;
    };
    export type Props = ComponentProps<"form"> & Data;
}

export const EditProfileForm = ({
    uploads,
    ...props
}: EditProfileForm.Props) => {

    const { store } = useEditProfileFormContext();
    const router = useRouter();

    return (
        <form
            className={styles.form}
            {...props}
        >
            <div className={styles.form__content}>
                <div className={styles.form__hero}>
                    <div className={styles.form__hero__background}>
                        <EditProfileBackGroundUploader uploads={uploads} cropperPageUrl="edit/upload" />
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
                                        placeholder={field.value}
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
                                    placeholder={field.value}
                                />
                            </FormField>
                        )}
                    />
                </Section>

                <Section
                    title={"Interests"}
                    cta={"Edit"}
                    onCtaClick={() => router.push("/profile/edit")}
                    ctaHref={"/profile/edit/interests"}
                >
                    <Controller
                        name={"interests"}
                        render={({ field, fieldState }) => (
                            <FormField state={fieldState}>
                                <EditProfileFormInterestsPicker interests={field.value} />
                            </FormField>
                        )}
                    />
                </Section>

                <Section className={styles.form__gap} title="Additional information">
                    <Controller<EditProfileFormSchemaValues, "location">
                        name={"location"}
                        render={({ field, fieldState }) => (
                            <FormField
                                state={fieldState}
                            >
                                <OptionsList>
                                    <OptionsListItem
                                        label={"Location"}
                                        description={field.value?.displayName}
                                        contentLeft={<IconLocation />}
                                        href={"/profile/edit/location/pick"}
                                    />
                                </OptionsList>
                            </FormField>
                        )}
                    />
                </Section>
            </div>
        </form>
    );
};
