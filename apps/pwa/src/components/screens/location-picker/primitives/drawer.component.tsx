"use client";

import { RefObject } from "react";
import { Link } from "@/i18n/routing";

import {
    GOOGLE_PLACES_API_INCLUDED_TYPES,
    useLocationPickerStore,
} from "@/features/location/picker";

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
import { observer } from "mobx-react-lite";
import { IBottomSheetStore } from "@/components/shared/_redesign/bottom-sheet/store";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places";

export namespace LocationPickerDrawer {
    export type Props = & LocationTypesListProps & {
        positionControls?: RefObject<BottomSheetPositionControls | null>;
        storeControls?: RefObject<IBottomSheetStore | null>;
        onSnapPointChange?: (snapPointIndex: number) => void;
    };

    export type LocationTypesListProps = {
        onLocationTypePick: (type: GooglePLacesApiIncludedTypes) => void;
    };
}

export const LocationPickerDrawer = ({
    storeControls,
    positionControls,
    onLocationTypePick,
    onSnapPointChange,
}: LocationPickerDrawer.Props) => {
    const { config } = useLocationPickerStore();

    return (
        <BottomSheetRoot
            touchEvents={true}
            dismissible={false}
            overlay={false}
            defaultOpen
            snapPoints={["fit-content", .14, 0]}
            externalControls={{
                storeControls,
                positionControls,
            }}
            onSnapPointChange={onSnapPointChange}
        >
            <BottomSheetPortal>
                <BottomSheetBody>
                    <div className={styles.drawer__scroll}>
                        <Scroll>
                            <LocationTypesList onLocationTypePick={onLocationTypePick} />
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

const LocationTypesList = observer(({
    onLocationTypePick,
}: LocationPickerDrawer.LocationTypesListProps) => {
    const locationPickerStore = useLocationPickerStore();
    return GOOGLE_PLACES_API_INCLUDED_TYPES.display.map(item => (
        <InterestButton
            key={item.slug}
            icon={item.icon}
            variant={
                locationPickerStore.filters.locationType === item.slug ? "primary" : "default"
            }
            onClick={() => onLocationTypePick(item.slug)}
        >
            { item.title_uk }
        </InterestButton>
    ));
});