"use client";


import { useLocationSearchConfirmation } from "@/features/location/search/hooks";

import { MapView } from "@/components/shared/map";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/bottom-sheet";

import { Button, ButtonsBlock, Container } from "@/components/ui";

import styles from "../styles/location-picker-confirm.module.scss";
import { OnboardingTextBlock } from "@/flows/onboarding/modules/text-block";
import { ConfirmBottomHeader } from "../modules/location-picker";

import { useRouter } from "@/i18n/routing";

export namespace EditProfileLocationPickerConfirmationPage {
    export type Props = never;
}

export function EditProfileLocationPickerConfirmationPage() {

    const router = useRouter();

    const {
        place,
        handleShowOnMap,
    } = useLocationSearchConfirmation();

    return (
        <>
            <MapView onMapReady={handleShowOnMap} />
            <BottomSheetRoot
                touchEvents={true}
                dismissible={false}
                overlay={false}
                defaultOpen
                snapPoints={["fit-content"]}
            >
                <BottomSheetPortal>
                    <BottomSheetBody>
                        <BottomSheetContent>
                            <BottomSheetHandle>
                                <ConfirmBottomHeader />
                            </BottomSheetHandle>

                            <Container className={styles.textBlock}>
                                <OnboardingTextBlock
                                    title={`Are You In ${place?.displayName}?`}
                                    subtitle={`You’ve selected ${place?.formattedAddress}. You can always change it later in your profile settings.`}
                                    className={styles.page__textBlock}
                                />
                            </Container>

                            <ButtonsBlock>
                                <Button
                                    variant={"accent"}
                                    onClick={() => router.push("/profile/edit")}
                                >
                                    Yes, browse events
                                </Button>
                            </ButtonsBlock>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    );
}
