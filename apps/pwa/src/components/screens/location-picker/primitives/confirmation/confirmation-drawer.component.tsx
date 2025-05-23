"use client";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle, BottomSheetPortal, BottomSheetRoot,
} from "@/components/shared/_redesign/bottom-sheet";
import { IBottomSheetExternalControls } from "@/components/shared/_redesign/bottom-sheet/types";

import styles from "./styles.module.scss";
import { CloseButton } from "@/components/shared/_redesign/close-button";
import { Container } from "@/components/ui";
import { ScrollSection } from "@/components/sections";
import { Button } from "@/components/shared/_redesign";
import Image from "next/image";
import { GetNearbyPlaces } from "@/api/google/places";
import { RefObject } from "react";

export namespace LocationPickerConfirmationDrawer {
    export type Props = Partial<IBottomSheetExternalControls> & {
        dataRef: RefObject<GetNearbyPlaces.TOutput["places"][number] | undefined>;
        onClose?: () => void;
    };
}

export const LocationPickerConfirmationDrawer = ({
    storeControls,
    onClose,
    dataRef,
}: LocationPickerConfirmationDrawer.Props) => {

    return (
        <BottomSheetRoot
            touchEvents={true}
            overlay={false}
            snapPoints={["fit-content"]}
            onClose={onClose}
            externalControls={{
                storeControls,
            }}
        >
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent>
                        {
                            () => {
                                return (
                                    <>
                                        <BottomSheetHandle>
                                            <div className={styles.drawer__header}>
                                                <div className={styles.drawer__info}>
                                                    <h1 className={styles.drawer__title}>
                                                        {
                                                            dataRef.current?.displayName.text
                                                        }
                                                    </h1>
                                                    <h2 className={styles.drawer__subtitle}>
                                                        { dataRef.current?.primaryTypeDisplayName?.text }
                                                    </h2>
                                                </div>
                                                <CloseButton />
                                            </div>
                                        </BottomSheetHandle>
                                        <Container>
                                            <ScrollSection container={false} className={styles.drawer__content}>
                                                <div className={styles.drawer__image}>
                                                    <Image src={"/assets/temp/poster3.png"} alt={"Location"} fill />
                                                </div>
                                                <div className={styles.drawer__image_group}>
                                                    <div className={styles.drawer__image}>
                                                        <Image src={"/assets/temp/poster3.png"} alt={"Location"} fill />
                                                    </div>
                                                    <div className={styles.drawer__image}>
                                                        <Image src={"/assets/temp/poster3.png"} alt={"Location"} fill />
                                                    </div>
                                                </div>
                                            </ScrollSection>
                                            <Button
                                                variant={"primary"}
                                            >
                                                Confirm
                                            </Button>
                                        </Container>
                                    </>
                                );
                            }
                        }
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
