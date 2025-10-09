"use client";

import { RefObject } from "react";

import { useLocationPicker } from "@/features/location/picker";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle, BottomSheetPortal, BottomSheetRoot,
} from "@/components/shared/bottom-sheet";

import { Button, Container, Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";
import { PlaceLocationEntity } from "@/entities/place";
import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";

import styles from "../styles.module.scss";

export namespace LocationPickerConfirmationDrawer {
    export type Props = {
        controller?: BottomSheetExternalController;
        dataRef: RefObject<Partial<PlaceLocationEntity> | undefined>;
        onClose?: () => void;
    };
}

export const LocationPickerConfirmationDrawer = ({
    dataRef,
    controller,
    onClose,
}: LocationPickerConfirmationDrawer.Props) => {
    const { config } = useLocationPicker();

    return (
        <BottomSheetRoot
            touchEvents={false}
            overlay={false}
            snapPoints={["fit-content"]}
            onClose={onClose}
            externalController={controller}
        >
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent>
                        {
                            () => (
                                <>
                                    <BottomSheetHandle>
                                        <Header
                                            size={"small"}
                                            iconBefore={
                                                <IconArrowLeft onClick={() => controller?.current?.close()} />
                                            }
                                            onControlBeforeClick={() => controller?.current?.close()}
                                        >
                                            Location
                                        </Header>
                                    </BottomSheetHandle>
                                    <Container className={styles.screen__content}>
                                        <div>
                                            <h1 className={styles.screen__title}>
                                                {
                                                    dataRef.current?.displayName
                                                }
                                            </h1>
                                            <p className={styles.screen__subtitle}>
                                                {dataRef.current?.primaryTypeDisplayName}
                                            </p>
                                            <p className={styles.screen__subtitle}>
                                                {dataRef.current?.formattedAddress}
                                            </p>
                                        </div>

                                        <div className={styles.screen__buttons}>
                                            <Button
                                                target={"_blank"}
                                                variant={"secondary-muted"}
                                                href={dataRef.current?.googleMapsUri}
                                            >
                                                View in Google maps
                                            </Button>
                                            <Button href={config.callbackUrl}>
                                                Confirm
                                            </Button>
                                        </div>
                                    </Container>
                                </>
                            )
                        }
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
