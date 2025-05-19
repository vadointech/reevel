"use client";

import { PropsWithChildren, ReactNode, MouseEvent } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
    useBottomSheetStore,
} from "@/components/shared/_redesign/bottom-sheet";
import { Button, Header } from "@/components/shared/_redesign";

import { Container } from "@/components/ui";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace CreateEventFormBottomSheet {
    export type Props = BottomSheetRoot.Props;

    export type TriggerProps = PropsWithChildren;
    export type ContentProps = PropsWithChildren<{
        title: string | ReactNode;
        size?: UISize;
        confirmButton?: boolean;
        resetButton?: boolean;
        onSubmit?: (event: MouseEvent<HTMLButtonElement>) => void;
        onReset?: (event: MouseEvent<HTMLButtonElement>) => void;
    }>;
}

export const CreateEventFormBottomSheet = (props: CreateEventFormBottomSheet.Props) => {
    return (
        <BottomSheetRoot snapPoints={["fit-content"]} fadeThreshold={0} {...props} />
    );
};

export const CreateEventFormBottomSheetTrigger = (props: CreateEventFormBottomSheet.TriggerProps) => {
    return (
        <BottomSheetTrigger {...props} />
    );
};

export const CreateEventFormBottomSheetBody = (props: BottomSheetBody.Props) => {
    return (
        <BottomSheetPortal>
            <BottomSheetBody {...props} />
        </BottomSheetPortal>
    );
};

export const CreateEventFormBottomSheetContent = ({
    title,
    size = "default",
    children,
    confirmButton = true,
    resetButton = true,
    onSubmit,
    onReset,
}: CreateEventFormBottomSheet.ContentProps) => {
    const bottomSheetStore = useBottomSheetStore();
    return (
        <BottomSheetContent>
            <BottomSheetHandle>
                <Header size={"large"}>
                    { title }
                </Header>
            </BottomSheetHandle>
            <Container
                className={cx(
                    styles.bottomSheet__content,
                    styles[`bottomSheet__content_size_${size}`],
                )}
            >
                { children }

                {
                    (confirmButton || resetButton) && (
                        <div className={styles.bottomSheet__buttons}>
                            {
                                resetButton && (
                                    <Button
                                        variant={"secondary-muted"}
                                        onClick={(event) => {
                                            onReset?.(event);
                                            bottomSheetStore.setClose();
                                        }}
                                    >
                                        Reset
                                    </Button>
                                )
                            }
                            {
                                confirmButton && (
                                    <Button
                                        variant={"primary"}
                                        onClick={(event) => {
                                            onSubmit?.(event);
                                            bottomSheetStore.setClose();
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
            </Container>
        </BottomSheetContent>
    );
};