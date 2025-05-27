"use client";

import { ComponentProps, useEffect, useRef } from "react";

import { MapView } from "@/components/shared/map";
import { LocationPickerConfirmationDrawer } from "./confirmation/confirmation-drawer.component";
import { IBottomSheetRootController } from "@/components/shared/_redesign/bottom-sheet/types";
import { useLocationPicker } from "@/features/location/picker";
import { GooglePlacesApiResponsePlace } from "@/api/google/places/types";
import { useRouter } from "@/i18n/routing";

export namespace LocationPickerConfirmationView {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerConfirmationView = ({ ...props }: LocationPickerConfirmationView.Props) => {

    const confirmControls = useRef<IBottomSheetRootController>(null);
    const confirmationDataRef = useRef<Partial<GooglePlacesApiResponsePlace> | undefined>(undefined);
    const { controller, confirmationStore } = useLocationPicker();
    const router = useRouter();

    useEffect(() => {
        const location = confirmationStore.location;
        if(location) {
            const data = controller.current.getCachedGooglePlacesApiResponse(location);

            if(!data) return router.push("/event/create/location");

            if(data) {
                confirmationDataRef.current = data;
                confirmControls.current?.open();
            }
        }
    }, []);

    return (
        <>
            <MapView />
            <LocationPickerConfirmationDrawer
                controller={confirmControls}
                dataRef={confirmationDataRef}
            />
        </>
    );
};
