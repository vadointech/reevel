import { MobxStore } from "@/types/common";
import { PlaceLocationEntity } from "@/entities/place";

export interface ILocationSearchStore extends MobxStore {
    searchQuery: string;
    nextPageToken: string | undefined;
    searchResults: PlaceLocationEntity[] | null;

    setSearchQuery(searchQuery: string): void;
    setSearchResults(searchResults: PlaceLocationEntity[] | null): void;
    setNextPageToken(nextPageToken: string | undefined): void;
}