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

export namespace CreateSettingsSheet {
    export type Props = BottomSheetRoot.Props;

    export type TriggerProps = PropsWithChildren;
    export type ContentProps = PropsWithChildren<{
        title: string | ReactNode;
        size?: UISize;
    }>;
}

export const CreateSettingsBottomSheet = (props: CreateSettingsSheet.Props) => {
    return (
        <BottomSheetRoot fitContent fadeThreshold={0} {...props} />
    );
};

export const CreateSettingsBottomSheetTrigger = ({
    children,
}: CreateSettingsSheet.TriggerProps) => {
    return (
        <BottomSheetTrigger>
            {children}
        </BottomSheetTrigger>
    );
};

export const CreateSettingsBottomSheetContent = ({
    title,
    size = "default",
    children,
}: CreateSettingsSheet.ContentProps) => {

    return (
        <BottomSheetPortal>
            <BottomSheetBody>
                <BottomSheetContent>
                    <BottomSheetHandle>
                        <Header size={"large"}>
                            {title}
                        </Header>
                    </BottomSheetHandle>
                    <Container
                        className={cx(
                            styles.bottomSheet__content,
                            styles[`bottomSheet__content_size_${size}`],
                        )}
                    >
                        {children}
                    </Container>
                </BottomSheetContent>
            </BottomSheetBody>
        </BottomSheetPortal>
    );
};