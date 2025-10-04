import { IMobxStore } from "@/lib/mobx";
import { EventEntity } from "@/entities/event";

export interface ICalendarStore extends IMobxStore {
    searchResults: EventEntity[] | null;
    setSearchResults(searchResults: EventEntity[] | null): void;
}