import { action, makeObservable, observable, reaction } from "mobx";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { InterestEntity } from "@/entities/interests";
import { ObjectUnique } from "@/utils/object-unique";

interface IInterestsPickerStore {
    interests: InterestEntity[];
    selectedInterests: InterestEntity[];
}

class InterestsPickerStore implements IInterestsPickerStore {
    interests: InterestEntity[] = [];
    selectedInterests: InterestEntity[] = [];

    searchTerm: string = "";
    nextPageToken?: string;

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
            appendInterests: action,
            insertInterestsAt: action,
            removeInterestsBy: action,
            isInterestSelected: action,
            addInterestToSelection: action,
            removeInterestFromSelection: action,
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

    setInterests(interests: InterestEntity[], nextPageToken: string = "token") {
        this.interests = [... new ObjectUnique(interests, "slug")];
        if(interests.length === 0) {
            this.nextPageToken = undefined;
        } else {
            this.nextPageToken = nextPageToken;
        }
    }

    appendInterests(results: InterestEntity[], nextPageToken?: string) {
        this.setInterests([
            ...this.interests,
            ...results,
        ], nextPageToken);
    }

    insertInterestsAt(index: number, newInterests: readonly InterestEntity[]) {
        this.setInterests([
            ...this.interests.slice(0, index + 1),
            ...newInterests,
            ...this.interests.slice(index + 1),
        ]);
    }

    removeInterestsBy(filterFunc: (item: InterestEntity) => boolean) {
        this.interests = this.interests.filter(filterFunc);
    }

    isInterestSelected(slug: string) {
        return this.selectedInterests.some(interest => interest.slug === slug);
    }

    addInterestToSelection(interest: InterestEntity) {
        this.selectedInterests.push(interest);
    }

    removeInterestFromSelection(slug: string) {
        this.selectedInterests = this.selectedInterests.filter(
            interest => interest.slug !== slug,
        );
    }

    setSearchTerm(searchTerm: string) {
        this.searchTerm = searchTerm;
    }
}

export const [InterestsPickerStoreProvider, useInterestsPickerStore] = createMobxStoreProvider(InterestsPickerStore);