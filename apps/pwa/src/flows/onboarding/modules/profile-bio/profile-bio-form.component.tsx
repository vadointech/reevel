"use client";

import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

import { FormField, Input } from "@/components/ui";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace OnboardingProfileBioForm {
    export type Props = ComponentProps<"form">;
}

export const OnboardingProfileBioForm = ({ className, ...props }: OnboardingProfileBioForm.Props) => {

    return (
        <form
            className={cx(styles.form, className)}
            {...props}
        >
            <Controller
                name={"fullName"}
                render={({ field }) => (
                    <FormField>
                        <Input
                            {...field}
                            label={"Full name"}
                            placeholder={"Enter your name"}
                        />
                    </FormField>
                )}
            />
            <Controller
                name={"bio"}
                render={({ field }) => (
                    <FormField>
                        <Input.TextArea
                            {...field}
                            label={"Bio"}
                            placeholder={"Enter short bio"}
                        />
                    </FormField>
                )}
            />
        </form>
    );
};