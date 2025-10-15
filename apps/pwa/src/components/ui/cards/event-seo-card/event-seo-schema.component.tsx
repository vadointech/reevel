
import { EventEntity } from "@/entities/event";
import { Event, WithContext, ItemList } from "schema-dts";
import { getEventJsonLdSchema } from "@/features/event/jsonLd.schema";

export namespace EventSeoJsonSchema {
    export type Data = {
        event: EventEntity;
    };
    export type Props = Data;
}

export const EventSeoJsonSchema = ({ event }: EventSeoJsonSchema.Props) => {
    const jsonLd: WithContext<Event> = {
        "@context": "https://schema.org",
        ...getEventJsonLdSchema(event),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

export namespace EventListSeoJsonSchema {
    export type Data = {
        title: string;
        description: string;
        events: EventEntity[];
    };
}

export const EventListSeoJsonSchema = ({
    title,
    description,
    events,
}: EventListSeoJsonSchema.Data) => {
    const jsonLd: WithContext<ItemList> = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": title,
        "description": description,
        "numberOfItems": events.length,
        "itemListElement": events.map((event, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": getEventJsonLdSchema(event),
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
