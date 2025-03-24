"use client";

import { InterestEntity } from "@/entities/interests";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

export interface ICreateEventStore {
    title: string;
    description: string;
    interests: InterestEntity[];
    poster: string;
    location?: [number, number];
    locationQuery: string;
    interestQuery: string,
}

class CreateEventStore implements ICreateEventStore {
    title: string = "";
    description: string = "";
    poster: string = "";
    interests: InterestEntity[] = [];

    interestQuery: string = "";
    locationQuery: string = "";
    location?: [number, number] = undefined;


    constructor(init?: Partial<ICreateEventStore>) {
        makeObservable(this, {
            title: observable,
            description: observable,
            poster: observable,
            interests: observable.shallow,
            interestQuery: observable,
            locationQuery: observable,
            location: observable.ref,
            setTitle: action,
            setPicture: action,
            setDescription: action,
            addInterest: action,
            removeInterest: action,
            setLocationQuery: action,
            setInterestQuery: action,
            setLocation: action,
        });

        initStore(this, init);
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

    addInterest(interest: InterestEntity): void {
        this.interests.push(interest);
    }

    removeInterest(interest: InterestEntity): void {
        this.interests = this.interests.filter(item => item.slug !== interest.slug);
    }
    setInterestQuery(query: string) {
        this.interestQuery = query;
    }

    setLocationQuery(query: string) {
        this.locationQuery = query;
    }

    setLocation(lng: number, lat: number) {
        this.location = [lng, lat];
    }
}

export const [CreateEventStoreProvider, useEventStore] = createMobxStoreProvider(CreateEventStore);