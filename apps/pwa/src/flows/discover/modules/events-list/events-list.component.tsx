import { RecommendationCard, Scroll } from "@/components/ui";
import { EventEntity } from "@/entities/event";
import { Link } from "@/i18n/routing";

export namespace DiscoverEventsList {
    export type Data = {
        events: EventEntity[]
    };
    export type Props = Data & {
        startIndex: number;
        onChange: (index: number) => void;
    };
}

export const DiscoverEventsList = ({
    events,
    startIndex,
    onChange,
}: DiscoverEventsList.Props) => {
    return (
        <Scroll startIndex={startIndex} onChange={onChange} dragFree={false}>
            {
                events.map((event, index) => (
                    <Link
                        key={event.id}
                        href={`/discover/event/${event.id}`}
                    >
                        <RecommendationCard event={event} />
                    </Link>
                ))
            }
        </Scroll>
    );
};
