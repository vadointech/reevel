"use client";
import { useEventStore } from "../features/_event";

export const isFormValid = () => {
    const { title, description, interests, dateStore, location, tickets, price } = useEventStore();

    // Check required fields
    const hasTitle = title.trim().length > 0;
    const hasDescription = description.trim().length > 0;
    const hasInterests = interests.length > 0;
    const hasLocation = location !== undefined;
    const hasTickets = tickets > 0;
    const hasPrice = price > 0;

    // Check date and time
    const hasValidDate = dateStore.startDate instanceof Date;
    const hasValidTime = dateStore.startHour !== "" && dateStore.startMinute !== "";

    return hasTitle &&
        hasDescription &&
        hasInterests &&
        hasLocation &&
        hasTickets &&
        hasPrice &&
        hasValidDate &&
        hasValidTime;
};