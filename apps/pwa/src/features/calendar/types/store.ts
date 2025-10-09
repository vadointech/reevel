import { IMobxStore } from "@/lib/mobx";
import { EventEntity, EventParticipationType } from "@/entities/event";

export interface ICalendarStore extends IMobxStore {
    searchResults: EventEntity[] | null;
    participationType: EventParticipationType | null;
    setSearchResults(searchResults: EventEntity[] | null): void;
    setParticipationType(type: EventParticipationType | null): void;
}