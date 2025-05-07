"use client";

import { ComponentProps } from "react";
import { Input, TextArea } from "@/components/ui";
import { observer } from "mobx-react-lite";

import cx from "classnames";
import styles from "./styles.module.scss";
import { useEventStore } from "@/features/event";
import { IconApple } from "@/components/icons";
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
    const eventStore = useEventStore();
    return (
        <Input
            onChange={(e) => eventStore.setTitle(e.target.value)}
            label={"Title"}
            placeholder={"Enter title"}
            variant={"default"}
        />
    );
});

export const Description = observer(() => {
    const eventStore = useEventStore();
    return (
        <TextArea
            onChange={(e) => eventStore.setDescription(e.target.value)}
            label={"Description"}
            placeholder={"Enter description"}
            variant={"default"}
        />
    );
});
