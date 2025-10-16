import { IMobxStore } from "@/lib/mobx";
import { EditProfileFormSchemaValues } from "../edit-profile-form.schema";

export interface IEditProfileFormStore extends IMobxStore {
    /**
     * `version` acts as a force-update counter.
     * MobX does not trigger reactions when the same primitive value (like a string) is assigned.
     *  By incrementing `version` on every call, we ensure observers always re-render,
     *  even if `pictureToSelect` was set to the same string as before.
     */
    version: number;
    loading: boolean;
    pictureToSelect: string;
    formValues: Partial<EditProfileFormSchemaValues>;

    setLoading(loading: boolean): void;
    setPictureToSelect(pictures: string): void;
    setFormValues(values: Partial<EditProfileFormSchemaValues>): void;
}