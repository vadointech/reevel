import { EventEntity } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

export function extractUniqueInterests(events: EventEntity[]): InterestEntity[] {
    const interestMap = new Map<string, InterestEntity>();

    for (const event of events) {
        for (const eventInterest of event.interests || []) {
            if (eventInterest && eventInterest.interest) {
                interestMap.set(eventInterest.interest.slug, eventInterest.interest);
            }
        }
    }

    return Array.from(interestMap.values());
}