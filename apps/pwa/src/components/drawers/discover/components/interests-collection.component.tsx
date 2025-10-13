import { ScrollSection } from "@/components/sections";
import { Link } from "@/i18n/routing";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { CollectionCard } from "@/components/ui";
import { InterestEntity } from "@/entities/interests";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/features/session";
import { GetInterestsFeedQuery } from "@/features/discover/queries";

export namespace InterestsCollectionSlider {
    export type Props = ScrollSection.Props & {
        interestsInit: InterestEntity[];
    };
}

export const InterestsCollectionSlider = ({
    interestsInit,
    ...props
}: InterestsCollectionSlider.Props) => {
    const session = useSessionContext();
  
    const { data, isFetching } = useQuery({
        enabled: session.store.authenticated,
        placeholderData: interestsInit,
        ...GetInterestsFeedQuery(),
    });

    if(isFetching) {
        return "Fetching...";
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
};
