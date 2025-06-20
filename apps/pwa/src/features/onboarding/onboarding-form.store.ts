import { action, makeObservable, observable } from "mobx";
import { IOnboardingFormStore, OnboardingFormConfigParams } from "./types";
import { OnboardingFormSchemaValues } from "./onboarding-form.schema";

export class OnboardingFormStore implements IOnboardingFormStore {
    defaultValues: OnboardingFormSchemaValues;
    pictureToSelect: string;

    constructor(init: OnboardingFormConfigParams) {
        makeObservable(this, {
            pictureToSelect: observable,
            setPictureToSelect: action,
        });

        this.defaultValues = init.defaultValues;
        this.pictureToSelect = init.pictureToSelect;
    }

    dispose() {}

    setPictureToSelect(pictures: string) {
        this.pictureToSelect = pictures;
    }
}
