import { dateTime } from "@/features/event/utils";

export function useCreateEventFormFieldFormatter() {

    const formatTickets = (value: any)  => {
        return (!value || value === 0) ? "Unlimited" : value;
    };

    const formatPrice = (value: any, currency: string = "₴") => {
        return (!value || value === 0) ? "Free" : `${value} ${currency}`;
    };

    const formatDate = (value: any) => {
        return dateTime.formatRelative(value);
    };

    const formatTime = (value: any) => {
        return (!value || value === 0) ? "All day" : dateTime.formatTime(value);
    };

    return {
        formatTickets,
        formatPrice,
        formatDate,
        formatTime,
    };
}