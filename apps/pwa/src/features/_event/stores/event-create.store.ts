"use client";

import { InterestEntity } from "@/entities/interests";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

export interface IDateEventStore {
    startDate: Date;
    startHour: string;
    startMinute: string;

    endDate: string;
    endHour: string;
    endMinute: string;

    toggle: boolean;
    error: string;
}

class DateEventStore implements IDateEventStore {
    startDate: Date = new Date()
    startHour: string = "";
    startMinute: string = "00";

    endDate: string = "";
    endHour: string = "";
    endMinute: string = "00";

    toggle: boolean = true;
    error: string = ""
    constructor() {
        makeObservable(this, {
            startDate: observable,
            startHour: observable,
            startMinute: observable,
            endDate: observable,
            endHour: observable,
            endMinute: observable,
            toggle: observable,
            error: observable,
            setError: action,
            setStartDate: action,
            setStartHour: action,
            setStartMinute: action,
            setEndDate: action,
            setEndHour: action,
            setEndMinute: action,
            setToggle: action,
        });
    }
    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }
    setError(error: string) {
        this.error = error
    }

    setStartDate(date: Date) {
        this.startDate = date;
    }

    setStartHour(hour: string) {
        this.startHour = hour
    }

    setStartMinute(minute: string) {
        this.startMinute = minute
    }

    setEndDate(date: string) {
        this.endDate = date;
    }

    setEndHour(hour: string) {
        this.endHour = hour
    }

    setEndMinute(minute: string) {
        this.endMinute = minute
    }
}

export type Type = "Private" | "Public"

export interface ICreateEventStore {
    title: string;
    description: string;
    interests: InterestEntity[];
    poster: string;
    gradient: string;
    date: number;
    tickets: number;
    price: number;
    type: Type

    location?: [number, number];
    locationQuery: string;
    interestQuery: string,
}

class CreateEventStore implements ICreateEventStore {

    title: string = "";
    description: string = "";
    poster: string = "";
    gradient: string = ""
    interests: InterestEntity[] = [];
    date: number = 0;
    tickets: number = 0;
    price: number = 0;
    type: Type = "Public"

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
            gradient: observable,
            date: observable,
            tickets: observable,
            price: observable,
            type: observable,
            interests: observable.shallow,
            interestQuery: observable,
            locationQuery: observable,
            location: observable.ref,
            dateStore: observable,
            setTitle: action,
            setTickets: action,
            setPrice: action,
            setPoster: action,
            setGradient: action,
            setDescription: action,
            setType: action,
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

    setTickets(tickets: number) {
        this.tickets = tickets;
    }

    setPrice(price: number) {
        this.price = price;
    }

    setPoster(poster: string) {
        this.poster = poster;
    }

    setGradient(gradient: string) {
        this.gradient = gradient;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setType(type: Type) {
        this.type = type;
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