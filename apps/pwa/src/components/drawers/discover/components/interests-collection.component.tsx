import { ScrollSection, ScrollSectionSkeleton } from "@/components/sections";
import { Link } from "@/i18n/routing";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { CollectionCard, CollectionCardSkeleton } from "@/components/ui";
import { InterestEntity } from "@/entities/interests";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/features/session";
import { GetInterestsFeedQuery } from "@/features/discover/queries";
import { observer } from "mobx-react-lite";

export namespace InterestsCollectionSlider {
    export type Props = ScrollSection.Props & {
        interestsInit: InterestEntity[];
    };
}

export const InterestsCollectionSlider = observer(({
    interestsInit,
    ...props
}: InterestsCollectionSlider.Props) => {
    const session = useSessionContext();

    const { data, isFetching } = useQuery({
        enabled: session.store.authenticated,
        placeholderData: interestsInit,
        ...GetInterestsFeedQuery(),
    });

    const isLoading = isFetching || session.store.loading;

    if(isLoading) {
        return (
            <ScrollSectionSkeleton title className={props.className}>
                {
                    [...new Array(3).keys()].map((item) => (
                        <CollectionCardSkeleton key={`collection-card-skeleton-${item}`} />
                    ))
                }
            </ScrollSectionSkeleton>
        );
    }

    return (
        <ScrollSection
            title={"Events for You"}
            variant={"text-accent"}
            {...props}
        >
            {
                data?.map(interest => (
                    <Link
                        key={interest.slug}
                        href={DiscoverStaticCollections.Root + "/" + interest.slug}
                    >
                        <CollectionCard
                            interest={interest}
                            location={"Vinnitsa"}
                        />
                    </Link>
                ))
            }
        </ScrollSection>
    );
});
