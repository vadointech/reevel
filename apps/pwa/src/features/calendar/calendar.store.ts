import { ICalendarStore } from "./types";
import { action, makeObservable, observable } from "mobx";
import { EventEntity } from "@/entities/event";

export class CalendarStore implements ICalendarStore {
    searchResults: EventEntity[] | null = null;

    constructor() {
        makeObservable(this, {
            searchResults: observable,

            setSearchResults: action,
        });
    }

    dispose() {}

    setSearchResults(searchResults: EventEntity[] | null) {
        this.searchResults = searchResults;
    }
}