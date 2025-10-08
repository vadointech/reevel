"use client";

import { useRouter } from "@/i18n/routing";
import { usePersistentMap } from "@/components/shared/map";
import { useLocationSearchContext } from "@/features/location/search";
import { useLocationAccessRequest } from "@/features/location/search/hooks";
import { GetLocationByCoordinatesQueryBuilder } from "@/features/location/search/queries";

import { Button } from "@/components/ui";

export const OnboardingLocationRequest = () => {
    const router = useRouter();
    const { provider } = usePersistentMap();
    const { store, config } = useLocationSearchContext();

    const { handleRequestLocationAccess } = useLocationAccessRequest({
        queryBuilder: GetLocationByCoordinatesQueryBuilder({
            accessToken: provider.current.internalConfig.accessToken,
            types: "place",
            language: "uk",
        }),
        onSuccess: (place) => {
            store.setLocationToConfirm(place);
            router.replace(config.confirmUrl);
        },
    });

    return (
        <Button
            variant={"accent"}
            onClick={handleRequestLocationAccess}
        >
            Allow Location Access
        </Button>
    );
};