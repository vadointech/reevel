"use client";

import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";
import { IOnboardingStore } from "./types";

class OnboardingStore implements IOnboardingStore {
    fullName: string = "";
    bio: string = "";
    picture: string = "";
    interests: string[] = [];

    locationQuery: string = "";
    locationCenter?: [number, number] = undefined;
    locationBbox?: [number, number, number, number] = undefined;

    initialState: Partial<IOnboardingStore> = {};

    constructor(init?: Partial<IOnboardingStore>) {
        makeObservable(this, {
            fullName: observable,
            bio: observable,
            picture: observable,
            interests: observable.shallow,
            locationQuery: observable,
            locationCenter: observable.ref,
            locationBbox: observable.ref,
            setName: action,
            setPicture: action,
            setBio: action,
            addInterest: action,
        });

        initStore(this, init);
        this.initialState = init || {};
    }

    dispose() {}

    setName(name: string) {
        this.fullName = name;
    }

    setPicture(picture: string) {
        this.picture = picture;
    }

    setBio(bio: string) {
        this.bio = bio;
    }

    addInterest(slug: string): void {
        this.interests.push(slug);
    }
}

export const [OnboardingStoreProvider, useOnboardingStore] = createMobxStoreProvider(OnboardingStore);