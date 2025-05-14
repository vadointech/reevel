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
        onSubmit?: (event: MouseEvent<HTMLButtonElement>) => void;
    }>;
}

export const CreateEventFormBottomSheet = (props: CreateEventFormBottomSheet.Props) => {

    return (
        <BottomSheetRoot fitContent fadeThreshold={0} {...props} />
    );
};

export const CreateEventFormBottomSheetTrigger = ({
    children,
}: CreateEventFormBottomSheet.TriggerProps) => {
    return (
        <BottomSheetTrigger>
            { children }
        </BottomSheetTrigger>
    );
};

export const CreateEventFormBottomSheetContent = ({
    title,
    size = "default",
    children,
    confirmButton = true,
    onSubmit,
}: CreateEventFormBottomSheet.ContentProps) => {
    const bottomSheetStore = useBottomSheetStore();
    return (
        <BottomSheetPortal>
            <BottomSheetBody>
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
                    </Container>
                </BottomSheetContent>
            </BottomSheetBody>
        </BottomSheetPortal>
    );
};