"use client";

import { createMobxStoreProvider } from "@/lib/mobx-store.provider";
import { UserProfileEntity } from "@/entities/profile";
import { makeAutoObservable } from "mobx";

type InitialData = Partial<UserProfileEntity>;

class OnboardingStore {
    fullName: string;
    bio: string;
    picture: string | undefined;

    interests: string[];

    location: [number, number] | undefined;

    constructor(options?: InitialData) {
        makeAutoObservable(this);

        this.fullName = options?.fullName || "";
        this.bio = options?.bio || "";
        this.picture = options?.picture;
        this.location = options?.location?.coordinates;

        this.interests = options?.interests ?
            options?.interests?.map(item => item.interestId) : [];
    }


    setName(name: string) {
        this.fullName = name;
    }

    setPicture(picture: string | undefined) {
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

    setLocation(lng: number, lat: number) {
        this.location = [lng, lat];
    }
}

export const [OnboardingStoreProvider, useOnboardingStore] = createMobxStoreProvider(OnboardingStore);