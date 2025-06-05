"use client";

import { PropsWithChildren, ReactNode, MouseEvent } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/_redesign/bottom-sheet";
import { Header } from "@/components/shared/_redesign";

import { Container } from "@/components/ui";
import { UISize } from "@/types/common";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ProfileSettingsBottomSheet {
    export type Props = BottomSheetRoot.Props;

    export type TriggerProps = PropsWithChildren;
    export type ContentProps = PropsWithChildren<{
        title: string | ReactNode;
        size?: UISize;
    }>;
}

export const ProfileSettingsBottomSheet = (props: ProfileSettingsBottomSheet.Props) => {
    return (
        <BottomSheetRoot snapPoints={["fit-content"]} fadeThreshold={0} {...props} />
    );
};

export const ProfileSettingsBottomSheetTrigger = ({
    children,
}: ProfileSettingsBottomSheet.TriggerProps) => {
    return (
        <BottomSheetTrigger>
            {children}
        </BottomSheetTrigger>
    );
};

export const ProfileSettingsBottomSheetContent = ({
    title,
    size = "default",
    children,
}: ProfileSettingsBottomSheet.ContentProps) => {

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