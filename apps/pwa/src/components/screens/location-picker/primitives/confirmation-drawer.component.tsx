"use client";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle, BottomSheetPortal, BottomSheetRoot,
} from "@/components/shared/_redesign/bottom-sheet";

import { Container } from "@/components/ui";
import { Button, Header } from "@/components/shared/_redesign";
import { GetNearbyPlaces } from "@/api/google/places";
import { RefObject } from "react";
import { BottomSheetExternalController } from "@/components/shared/_redesign/bottom-sheet/types";
import { IconArrowLeft } from "@/components/icons";
import { useLocationPicker } from "@/features/location/picker";

import styles from "../styles.module.scss";

export namespace LocationPickerConfirmationDrawer {
    export type Props = {
        controller?: BottomSheetExternalController;
        dataRef: RefObject<GetNearbyPlaces.TOutput["places"][number] | undefined>;
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
                                                    dataRef.current?.displayName?.text
                                                }
                                            </h1>
                                            <p className={styles.screen__subtitle}>
                                                { dataRef.current?.primaryTypeDisplayName?.text }
                                            </p>
                                            <p className={styles.screen__subtitle}>
                                                { dataRef.current?.formattedAddress }
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
