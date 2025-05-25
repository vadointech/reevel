"use client";

import { Link } from "@/i18n/routing";

import {
    GOOGLE_PLACES_API_INCLUDED_TYPES, useLocationPicker,
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

import styles from "../styles.module.scss";
import { observer } from "mobx-react-lite";
import { GooglePLacesApiIncludedTypes } from "@/api/google/places";
import { BottomSheetExternalController } from "@/components/shared/_redesign/bottom-sheet/types";

export namespace LocationPickerDrawer {
    export type Props = & LocationTypesListProps & {
        controller?: BottomSheetExternalController
        onSnapPointChange?: (snapPointIndex: number) => void;
    };

    export type LocationTypesListProps = {
        onLocationTypePick: (type: GooglePLacesApiIncludedTypes) => void;
    };
}

export const LocationPickerDrawer = ({
    onLocationTypePick,
    controller,
}: LocationPickerDrawer.Props) => {
    const { controller: pickerController } = useLocationPicker();

    return (
        <BottomSheetRoot
            touchEvents={true}
            dismissible={false}
            overlay={false}
            defaultOpen
            snapPoints={["fit-content", .14]}
            externalController={controller}
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
                                    href={pickerController.current.config.locationSearchUrl}
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
    const { filtersStore } = useLocationPicker();
    return GOOGLE_PLACES_API_INCLUDED_TYPES.display.map(item => (
        <InterestButton
            key={item.slug}
            icon={item.icon}
            variant={
                filtersStore.locationType === item.slug ? "primary" : "default"
            }
            onClick={() => onLocationTypePick(item.slug)}
        >
            { item.title_uk }
        </InterestButton>
    ));
});