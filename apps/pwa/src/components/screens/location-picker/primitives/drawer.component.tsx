"use client";

import { RefObject } from "react";
import { Link } from "@/i18n/routing";

import { useLocationPicker, useLocationPickerStore } from "@/features/location/picker";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/_redesign/bottom-sheet";
import { Container, Scroll } from "@/components/ui";
import { Button, Header, InterestButton } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";

import { BottomSheetPositionControls } from "@/components/shared/_redesign/bottom-sheet";

import styles from "../styles.module.scss";

export namespace LocationPickerDrawer {
    export type Props = {
        positionControls: RefObject<BottomSheetPositionControls | null>;
    };
}

export const LocationPickerDrawer = ({ positionControls }: LocationPickerDrawer.Props) => {
    const { config } = useLocationPickerStore();
    const {
        handleRequestLocation,
    } = useLocationPicker();

    return (
        <BottomSheetRoot
            touchEvents={true}
            dismissible={false}
            overlay={false}
            defaultOpen
            snapPoints={["fit-content", .14]}
        >
            <BottomSheetPortal>
                <BottomSheetBody
                    externalControls={{ positionControls }}
                >
                    <div className={styles.drawer__scroll}>
                        <Scroll>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                            <InterestButton variant={"background"}>
                                Keletska, 102A
                            </InterestButton>
                        </Scroll>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle>
                            <Header
                                size={"small"}
                                iconBefore={
                                    <Link href={"/event/create"}>
                                        <IconArrowLeft />
                                    </Link>
                                }
                            >
                                Location
                            </Header>
                        </BottomSheetHandle>
                        <Container className={styles.drawer__content}>
                            <div>
                                <h1 className={styles.drawer__title}>Where’s It Happening?</h1>
                                <p className={styles.drawer__subtitle}>
                                    Mark the location of your event or specify if it’s online.
                                </p>
                            </div>
                            <div className={styles.drawer__buttons}>
                                <Button
                                    variant={"secondary-muted"}
                                    href={config.locationSearchUrl}
                                >
                                    Enter location manually
                                </Button>
                                <Button
                                    variant={"primary"}
                                    onClick={handleRequestLocation}
                                >
                                    Allow location access
                                </Button>
                            </div>
                        </Container>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
