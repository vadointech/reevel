import { ComponentProps } from "react";
import Image from "next/image";
import { EventEntity } from "@/entities/event";
import { Link } from "@/i18n/routing";

export namespace EventSeoCard {
    export type Data = {
        event: EventEntity
    };
    export type Props = ComponentProps<"div"> & Data;
}

export const EventSeoCard = ({
    event,
    ...props
}: EventSeoCard.Props) => {
    const startDate = new Date(event.startDate);
    const endDate = event.endDate ? new Date(event.endDate) : null;
    return (
        <div {...props}>
            <Image
                width={122}
                height={122}
                src={event.poster}
                alt={`Event Poster: ${event.title}`}
            />

            <Link href={`/discover/event/${event.id}`}>
                <h2>{event.title}</h2>
            </Link>

            <p>
                <time dateTime={startDate.toISOString()}>
                    {startDate.toLocaleString("en-US")}
                </time>
                {
                    endDate ? (
                        <>
                            {" - "}
                            <time dateTime={endDate.toISOString()}>
                                {endDate.toLocaleString("en-US")}
                            </time>
                        </>
                    ) : null
                }
            </p>

            <p>{event.locationTitle}</p>

            {
                event.ticketPrice !== undefined && (
                    <div>
                        <strong>Ціна: {event.ticketPrice} {event.ticketPriceCurrency}</strong>
                        {
                            event.ticketsAvailable !== undefined && (
                                <span>Tickets left: { event.ticketsAvailable }</span>
                            )
                        }
                    </div>
                )
            }

            <p>{event.description}</p>

            {
                event.hosts && event.hosts.length > 0 && (
                    <div>
                        Hosting: {event.hosts.map(host => host.user.profile.fullName).join(", ")}
                    </div>
                )
            }

            {
                event.interests && event.interests.length > 0 && (
                    <div>
                        Categories: {event.interests.map(i => i.interest.title_en).join(", ")}
                    </div>
                )
            }
        </div>
    );
};

export namespace EventSeoCardGroup {
    export type Props = {
        title: string;
        event: EventEntity | EventEntity[];
    };
}

export const EventSeoCardGroup = ({
    title,
    event,
}: EventSeoCardGroup.Props) => {

    return (
        <div className={"content-hidden"}>
            <h1>{ title }</h1>
            <ul>
                {
                    Array.isArray(event) ?
                        event.map(event => (
                            <li key={`seo-event-${event.id}`}>
                                <EventSeoCard event={event} />
                            </li>
                        )) :
                        <li key={`seo-event-${event.id}`}>
                            <EventSeoCard event={event} />
                        </li>
                }
            </ul>
        </div>
    );
};
