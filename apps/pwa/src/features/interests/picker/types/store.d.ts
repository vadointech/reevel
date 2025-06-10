import { MobxStore } from "@/types/common";
import { InterestEntity } from "@/entities/interests";

export interface IInterestsPickerStore extends MobxStore {
    interests: InterestEntity[];
    selectedInterests: InterestEntity[];

    searchTerm: string;
    nextPageToken: string | undefined;

    setInterests(interests: InterestEntity[]): void;
    setSelectedInterests(selectedInterests: InterestEntity[]): void;
    setSearchTerm(term: string): void;
    setNextPageToken(pageToken: string | undefined): void;
}