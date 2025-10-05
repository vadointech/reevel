import { ICalendarStore } from "./types";
import { action, makeObservable, observable } from "mobx";
import { EventEntity, EventParticipationType } from "@/entities/event";

export class CalendarStore implements ICalendarStore {
    searchResults: EventEntity[] | null = null;
    participationType: EventParticipationType | null = null;

    constructor() {
        makeObservable(this, {
            searchResults: observable,
            participationType: observable,

            setSearchResults: action,
            setParticipationType: action,
        });
    }

    dispose() {}

    setSearchResults(searchResults: EventEntity[] | null) {
        this.searchResults = searchResults;
    }

    setParticipationType(type: EventParticipationType | null) {
        this.participationType = type;
    }
}