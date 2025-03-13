"use client";

import { ComponentProps } from "react";
import { Input, TextArea } from "@/components/ui";
import { useOnboardingStore } from "@/features/onboarding/stores/onboarding.store";
import { observer } from "mobx-react-lite";

import cx from "classnames";
import styles from "./styles.module.scss";
import { useCreateEventStore } from "@/features/onboarding/stores/event-create.store";

export namespace CreateEventBioForm {
    export type Props = ComponentProps<"form">;
}

export const CreateEventBioForm = ({ className, ...props }: CreateEventBioForm.Props) => {

    return (
        <form
            className={cx(styles.form, className)}
            {...props}
        >
            <Title />
            <Description />
        </form>
    );
};

const Title = observer(() => {
    const createEventStore = useCreateEventStore();
    return (
        <Input
            onChange={(e) => createEventStore.setTitle(e.target.value)}
            label={"Title"}
            placeholder={"Enter title"}
            variant={"default"}
        />
    );
});

export const Description = observer(() => {
    const createEventStore = useCreateEventStore();
    return (
        <TextArea
            onChange={(e) => createEventStore.setDescription(e.target.value)}
            label={"Description"}
            placeholder={"Enter description"}
            variant={"default"}
        />
    );
});
