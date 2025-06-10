import { action, makeObservable, observable, reaction } from "mobx";
import { initStore } from "@/lib/mobx";
import { InterestEntity } from "@/entities/interests";
import { IInterestsPickerStore } from "./types";

export class InterestsPickerStore implements IInterestsPickerStore {
    interests: InterestEntity[] = [];
    selectedInterests: InterestEntity[] = [];

    searchTerm: string = "";
    nextPageToken: string | undefined = undefined;

    private readonly disposeReaction?: () => void;

    constructor(
        init: Partial<IInterestsPickerStore>,
        syncSelectedInterests?: (interests: InterestEntity[]) => void,
    ) {
        makeObservable(this, {
            interests: observable.shallow,
            selectedInterests: observable.shallow,
            searchTerm: observable,
            nextPageToken: observable,

            setInterests: action,
            setSearchTerm: action,
        });

        initStore(this, init);

        if(syncSelectedInterests) {
            this.disposeReaction = reaction(
                () => this.selectedInterests.slice(), // Create a copy to react to array content changes
                (interests) => syncSelectedInterests(interests),
            );
        }
    }

    dispose() {
        this.disposeReaction?.();
    }

    setInterests(interests: InterestEntity[]) {
        this.interests = interests;
    }

    setSelectedInterests(selectedInterests: InterestEntity[]) {
        this.selectedInterests = selectedInterests;
    }

    setSearchTerm(searchTerm: string) {
        this.searchTerm = searchTerm;
    }

    setNextPageToken(pageToken: string | undefined) {
        this.nextPageToken = pageToken;
    }
}