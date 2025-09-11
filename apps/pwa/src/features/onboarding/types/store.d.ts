import { IMobxStore } from "@/lib/mobx";
import { OnboardingFormSchemaValues } from "@/features/onboarding";

export interface IOnboardingFormStore extends IMobxStore {
    /**
     * `version` acts as a force-update counter.
     * MobX does not trigger reactions when the same primitive value (like a string) is assigned.
     *  By incrementing `version` on every call, we ensure observers always re-render,
     *  even if `pictureToSelect` was set to the same string as before.
     */
    version: number;
    pictureToSelect: string;
    defaultValues: OnboardingFormSchemaValues;

    setPictureToSelect(pictures: string): void;
}