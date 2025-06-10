import { InterestEntity } from "@/entities/interests";

export interface IInterestsPickerController {
    setInterests(interests: InterestEntity[]): void;
    appendInterests(results: InterestEntity[], nextPageToken?: string): void;
    insertInterestsAt(index: number, newInterests: readonly InterestEntity[]): void;
    removeInterestsBy(filterFunc: (item: InterestEntity) => boolean): void;
    isInterestSelected(slug: string): boolean;
    addInterestToSelection(interest: InterestEntity): void;
    removeInterestFromSelection(slug: string): void;
}