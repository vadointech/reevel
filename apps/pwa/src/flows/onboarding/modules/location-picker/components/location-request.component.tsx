"use client";

import { useRouter } from "@/i18n/routing";
import { useLocationSearchContext } from "@/features/location/search";
import { useLocationAccessRequest } from "@/features/location/search/hooks";
import { SearchCityQuery } from "@/features/cities/queries";

import { Button } from "@/components/ui";

export const OnboardingLocationRequest = () => {
    const router = useRouter();
    const { store, config } = useLocationSearchContext();

    const { handleRequestLocationAccess } = useLocationAccessRequest({
        queryBuilder: SearchCityQuery,
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