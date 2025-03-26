"use client";

import { InterestEntity } from "@/entities/interests";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

export interface ICreateEventStore {
    title: string;
    description: string;
    interests: InterestEntity[];
    poster: string;
    date: number;
    location?: [number, number];
    locationQuery: string;
    interestQuery: string,
}

export interface IDateEventStore {
    startDate: string;
    startMonth: string;
    startHour: string;
    startMinute: string;

    endDate: string;
    endMonth: string;
    endHour: string;
    endMinute: string;

    toggle: boolean;
}

class DateEventStore implements IDateEventStore {
    startDate: string = "";
    startMonth: string = "";
    startHour: string = "";
    startMinute: string = "";

    endDate: string = "";
    endMonth: string = "";
    endHour: string = "";
    endMinute: string = "";

    toggle: boolean = true;
    constructor() {
        makeObservable(this, {
            startDate: observable,
            startMonth: observable,
            startHour: observable,
            startMinute: observable,
            endDate: observable,
            endMonth: observable,
            endHour: observable,
            endMinute: observable,
            toggle: observable,
            setStartMonth: action,
            setStartDate: action,
            setEndMonth: action,
            setEndDate: action,
            setToggle: action,
        });
    }
    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    setStartMonth(moth: string) {
        this.startMonth = moth;
    }

    setStartDate(date: string) {
        this.startDate = date;
    }

    setEndMonth(moth: string) {
        this.endMonth = moth;
    }

    setEndDate(date: string) {
        this.endDate = date;
    }
}


class CreateEventStore implements ICreateEventStore {
    title: string = "";
    description: string = "";
    poster: string = "";
    interests: InterestEntity[] = [];
    date: number = 0;

    interestQuery: string = "";
    locationQuery: string = "";
    location?: [number, number] = undefined;
    dateStore: DateEventStore;


    constructor(init?: Partial<ICreateEventStore>) {
        this.dateStore = new DateEventStore();

        makeObservable(this, {
            title: observable,
            description: observable,
            poster: observable,
            date: observable,
            interests: observable.shallow,
            interestQuery: observable,
            locationQuery: observable,
            location: observable.ref,
            dateStore: observable,
            setTitle: action,
            setPicture: action,
            setDescription: action,
            addInterest: action,
            removeInterest: action,
            setLocationQuery: action,
            setInterestQuery: action,
            setLocation: action,
            setDate: action,
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

    setDate(date: number) {
        this.date = date
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