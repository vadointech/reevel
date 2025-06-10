import { IInterestsPickerController, IInterestsPickerStore } from "./types";
import { InterestEntity } from "@/entities/interests";
import { ObjectUnique } from "@/utils/object-unique";

export class InterestsPickerController implements IInterestsPickerController {
    private readonly _store: IInterestsPickerStore;

    constructor(
        store: IInterestsPickerStore,
    ) {
        this._store = store;
    }

    setInterests(interests: InterestEntity[], nextPageToken: string = "token") {
        this._store.setInterests([
            ...new ObjectUnique(interests, "slug"),
        ]);
        if(interests.length === 0) {
            this._store.setNextPageToken(undefined);
        } else {
            this._store.setNextPageToken(nextPageToken);
        }
    }

    appendInterests(results: InterestEntity[], nextPageToken?: string) {
        this.setInterests([
            ...this._store.interests,
            ...results,
        ], nextPageToken);
    }

    insertInterestsAt(index: number, newInterests: readonly InterestEntity[]) {
        this.setInterests([
            ...this._store.interests.slice(0, index + 1),
            ...newInterests,
            ...this._store.interests.slice(index + 1),
        ]);
    }

    removeInterestsBy(filterFunc: (item: InterestEntity) => boolean) {
        this._store.setInterests(
            this._store.interests.filter(filterFunc),
        );
    }

    isInterestSelected(slug: string): boolean {
        return this._store.selectedInterests.some(interest => interest.slug === slug);
    }

    addInterestToSelection(interest: InterestEntity) {
        this._store.setSelectedInterests(
            [...this._store.selectedInterests, interest],
        );
    }

    removeInterestFromSelection(slug: string) {
        this._store.setSelectedInterests(
            this._store.selectedInterests.filter(
                interest => interest.slug !== slug,
            ),
        );
    }
}