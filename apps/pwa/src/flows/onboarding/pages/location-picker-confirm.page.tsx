"use client";


import { useLocationSearchConfirmation } from "@/features/location/search/hooks";

import { MapView } from "@/components/shared/map";
import { OnboardingTextBlock } from "../modules/text-block";
import { OnboardingNextStepButton, OnboardingProgressBar } from "../modules/progress";

import {
    BottomSheetBody,
    BottomSheetContent, BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
} from "@/components/shared/bottom-sheet";

import { ButtonsBlock, Container } from "@/components/ui";

import styles from "../styles/location-picker-confirm.module.scss";

export namespace OnboardingLocationPickerConfirmationPage {
    export type Props = never;
}

export function OnboardingLocationPickerConfirmationPage() {

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
                                <OnboardingProgressBar step={3} />
                            </BottomSheetHandle>

                            <Container className={styles.textBlock}>
                                <OnboardingTextBlock
                                    title={`Are You In ${place?.displayName}?`}
                                    subtitle={`You’ve selected ${place?.formattedAddress}. You can always change it later in your profile settings.`}
                                    className={styles.page__textBlock}
                                />
                            </Container>

                            <ButtonsBlock>
                                <OnboardingNextStepButton
                                    variant={"accent"}
                                >
                                    Yes, browse events
                                </OnboardingNextStepButton>
                            </ButtonsBlock>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    );
}
