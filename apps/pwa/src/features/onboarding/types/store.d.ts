import { IMobxStore } from "@/lib/mobx";
import { OnboardingFormSchemaValues } from "@/features/onboarding";

export interface IOnboardingFormStore extends IMobxStore {
    defaultValues: OnboardingFormSchemaValues;
    pictureToSelect: string;

    setPictureToSelect(pictures: string): void;
}