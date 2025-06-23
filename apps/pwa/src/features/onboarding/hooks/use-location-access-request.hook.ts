import { useLocationAccessRequest } from "@/features/location/search/hooks";
import { useRouter } from "@/i18n/routing";
import {
    GetLocationByCoordinatesQueryBuilder,
} from "@/features/location/search/queries";
import { usePersistentMap } from "@/components/shared/map";
import { useLocationSearchContext } from "@/features/location/search";

export function useOnboardingLocationAccessRequest() {
    const router = useRouter();
    const { provider } = usePersistentMap();
    const { store, config } = useLocationSearchContext();

    return useLocationAccessRequest({
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
}