"use client";

import { ComponentProps } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "@/components/shared/_redesign";
import { useOnboardingStore } from "@/features/onboarding/stores/onboarding.store";

import cx from "classnames";
import styles from "./styles.module.scss";

export namespace OnboardingBioForm {
    export type Props = ComponentProps<"form">;
}

export const OnboardingBioForm = ({ className, ...props }: OnboardingBioForm.Props) => {

    return (
        <form
            className={cx(styles.form, className)}
            {...props}
        >
            <Name />
            <Bio />
        </form>
    );
};

const Name = observer(() => {
    const onboardingStore = useOnboardingStore();
    return (
        <Input
            value={onboardingStore.fullName}
            onChange={(e) => onboardingStore.setName(e.target.value)}
            label={"Full name"}
            placeholder={"Enter your name"}
        />
    );
});

export const Bio = observer(() => {
    const onboardingStore = useOnboardingStore();
    return (
        <Input.TextArea
            value={onboardingStore.bio}
            onChange={(e) => onboardingStore.setBio(e.target.value)}
            label={"Bio"}
            placeholder={"Enter short bio"}
        />
    );
});
