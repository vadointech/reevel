"use client";

import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

export interface IOnboardingStore {
    fullName: string;
    bio: string;
    picture: string;
    interests: string[];
    location?: [number, number];
    locationQuery: string;
}

class OnboardingStore implements IOnboardingStore {
    fullName: string = "";
    bio: string = "";
    picture: string = "";
    interests: string[] = [];

    locationQuery: string = "";
    location?: [number, number] = undefined;

    initialState: Partial<IOnboardingStore> = {};

    constructor(init?: Partial<IOnboardingStore>) {
        makeObservable(this, {
            fullName: observable,
            bio: observable,
            picture: observable,
            interests: observable.shallow,
            locationQuery: observable,
            location: observable.ref,
            setName: action,
            setPicture: action,
            setBio: action,
            addInterest: action,
            removeInterest: action,
            setLocationQuery: action,
            setLocation: action,
        });

        initStore(this, init);
        this.initialState = init || {};
    }


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

    removeInterest(slug: string): void {
        this.interests = this.interests.filter(item => item !== slug);
    }

    setLocationQuery(query: string) {
        this.locationQuery = query;
    }

    setLocation(lng: number, lat: number) {
        this.location = [lng, lat];
    }
}

export const [OnboardingStoreProvider, useOnboardingStore] = createMobxStoreProvider(OnboardingStore);