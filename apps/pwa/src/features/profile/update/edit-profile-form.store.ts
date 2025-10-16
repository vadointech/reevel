import { action, makeObservable, observable } from "mobx";
import { IEditProfileFormStore } from "./types";
import { EditProfileFormSchemaValues } from "./edit-profile-form.schema";

export class EditProfileFormStore implements IEditProfileFormStore {
    pictureToSelect: string = "/assets/defaults/avatar.png";
    formValues: Partial<EditProfileFormSchemaValues> = {};
    version: number = 0;
    loading: boolean = true;

    constructor() {
        makeObservable(this, {
            version: observable,
            loading: observable,
            pictureToSelect: observable,
            setPictureToSelect: action,
            setLoading: action,
        });
    }

    dispose() {}

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setPictureToSelect(pictures: string) {
        this.pictureToSelect = pictures;
        this.version++;
    }

    setFormValues(values: Partial<EditProfileFormSchemaValues>) {
        if(this.formValues) {
            this.formValues = {
                ...this.formValues,
                ...values,
            };
        }
    }
}