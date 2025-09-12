import { action, makeObservable, observable } from "mobx";
import { IOnboardingFormStore, OnboardingFormConfigParams } from "./types";
import { OnboardingFormSchemaValues } from "./onboarding-form.schema";

export class OnboardingFormStore implements IOnboardingFormStore {
    pictureToSelect: string;
    formValues: OnboardingFormSchemaValues;
    version: number = 0;

    constructor(init: OnboardingFormConfigParams) {
        makeObservable(this, {
            version: observable,
            pictureToSelect: observable,
            setPictureToSelect: action,
        });

        this.pictureToSelect = init.pictureToSelect;
        this.formValues = init.defaultValues;
    }

    dispose() {}

    setPictureToSelect(pictures: string) {
        this.pictureToSelect = pictures;
        this.version++;
    }

    setFormValues(values: Partial<OnboardingFormSchemaValues>) {
        this.formValues = {
            ...this.formValues,
            ...values,
        };
    }
}
