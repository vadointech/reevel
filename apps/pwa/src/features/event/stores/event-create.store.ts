"use client";

import { InterestEntity } from "@/entities/interests";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

export interface ICreateEventStore {
    title: string;
    description: string;
    interests: string[];
    initialInterests: InterestEntity[];
    poster: string;
    location?: [number, number];
    locationQuery: string;
}

class CreateEventStore implements ICreateEventStore {
    title: string = "";
    description: string = "";
    poster: string = "";
    interests: string[] = [];
    initialInterests: InterestEntity[] = [];

    locationQuery: string = "";
    location?: [number, number] = undefined;

    initialState: Partial<ICreateEventStore> = {};

    constructor(init?: Partial<ICreateEventStore>) {
        makeObservable(this, {
            title: observable,
            description: observable,
            poster: observable,
            interests: observable.shallow,
            locationQuery: observable,
            location: observable.ref,
            setTitle: action,
            setPicture: action,
            setDescription: action,
            addInterest: action,
            removeInterest: action,
            setLocationQuery: action,
            setLocation: action,
        });

        initStore(this, init);
        this.initialState = init || {};
    }


    setTitle(title: string) {
        this.title = title;
    }

    setPicture(poster: string) {
        this.poster = poster;
    }

    setDescription(description: string) {
        this.description = description;
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

export const [CreateEventStoreProvider, useEventStore] = createMobxStoreProvider(CreateEventStore);