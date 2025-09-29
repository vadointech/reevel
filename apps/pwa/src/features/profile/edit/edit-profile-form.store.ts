import { action, makeObservable, observable } from "mobx";
import { IEditProfileFormStore } from "./types";
import { EditProfileFormConfigParams } from "./types/config";
import { EditProfileFormSchemaValues } from "./edit-profile-form.scheme";

export class EditProfileFormStore implements IEditProfileFormStore {
    pictureToSelect: string;
    formValues: EditProfileFormSchemaValues;
    version: number = 0;

    constructor(init: EditProfileFormConfigParams) {
        this.pictureToSelect = init.pictureToSelect;
        this.formValues = init.defaultValues;

        makeObservable(this, {
            version: observable,
            pictureToSelect: observable,
            setPictureToSelect: action,
        });
    }

    dispose() { }

    setPictureToSelect(pictures: string) {
        this.pictureToSelect = pictures;
        this.version++;
    }

    setFormValues(values: Partial<EditProfileFormSchemaValues>) {
        this.formValues = {
            ...this.formValues,
            ...values,
        };
    }
}
